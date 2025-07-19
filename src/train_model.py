import argparse
import logging
import os

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import GridSearchCV
from sklearn.metrics import mean_squared_error, r2_score
from joblib import dump

import pandas as pd
import numpy as np

# Seed for reproducibility
np.random.seed(42)

# Create a date range
dates = pd.date_range(start="2025-07-01", periods=10, freq="D")

# Generate data for two tickers
data = []
for ticker in ["AAA", "BBB"]:
    price = 100 + np.cumsum(np.random.normal(0, 1, size=len(dates)))
    for i, date in enumerate(dates):
        open_price = round(price[i] + np.random.normal(0, 0.5), 2)
        high_price = round(open_price + abs(np.random.normal(0, 1)), 2)
        low_price = round(open_price - abs(np.random.normal(0, 1)), 2)
        close_price = round(low_price + np.random.rand() * (high_price - low_price), 2)
        data.append(
            {
                "date": date,
                "ticker": ticker,
                "open": open_price,
                "high": high_price,
                "low": low_price,
                "close": close_price,
            }
        )

# Build DataFrame
df_test = pd.DataFrame(data)

# configure logging
tlogging = logging.getLogger(__name__)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler()],
)

# === Configuration ===
DATA_PATH = os.getenv("DATA_PATH", "data/dados_acoes.csv")
OUTPUT_PATH = os.getenv("OUTPUT_PATH", "models/stock_model.joblib")
TEST_SIZE = float(os.getenv("TEST_SIZE", "0.2"))
# ======================


def load_data(file_path: str) -> pd.DataFrame:
    """load csv and sort by ticker and date"""
    if not os.path.exists(file_path):
        logging.error("data file not found: %s", file_path)
        raise FileNotFoundError(f"file not found: {file_path}")
    df = pd.read_csv(file_path, parse_dates=["date"])
    df.sort_values(["ticker", "date"], inplace=True)
    df.reset_index(drop=True, inplace=True)
    return df


def engineer_features(df: pd.DataFrame) -> pd.DataFrame:
    """create features and target for prediction"""
    df = df.copy()
    df["return"] = df.groupby("ticker")["close"].pct_change()
    for lag in [1, 2, 3]:
        df[f"return_lag_{lag}"] = df.groupby("ticker")["return"].shift(lag)
    df["sma_5"] = df.groupby("ticker")["close"].transform(lambda x: x.rolling(5).mean())
    df["volatility_5"] = df.groupby("ticker")["return"].transform(
        lambda x: x.rolling(5).std()
    )
    df["target"] = df.groupby("ticker")["return"].shift(-1)
    required = [f"return_lag_{l}" for l in [1, 2, 3]] + [
        "sma_5",
        "volatility_5",
        "target",
    ]
    df.dropna(subset=required, inplace=True)
    return df


def split_data(df: pd.DataFrame, features: list, test_size: float):
    """split data into train and test preserving time order"""
    X = df[features]
    y = df["target"]
    split_idx = int(len(df) * (1 - test_size))
    X_train, X_test = X.iloc[:split_idx], X.iloc[split_idx:]
    y_train, y_test = y.iloc[:split_idx], y.iloc[split_idx:]
    logging.info(
        "data split: %d train samples, %d test samples", len(X_train), len(X_test)
    )
    return X_train, X_test, y_train, y_test


def build_pipeline() -> Pipeline:
    """build preprocessing and model pipeline"""
    return Pipeline(
        [
            ("scaler", StandardScaler()),
            ("rf", RandomForestRegressor(random_state=42, n_jobs=-1)),
        ]
    )


def train_and_evaluate(X_train, X_test, y_train, y_test):
    """train model with grid search and evaluate performance"""
    pipeline = build_pipeline()
    param_grid = {"rf__n_estimators": [100, 200], "rf__max_depth": [5, 10, None]}
    search = GridSearchCV(
        pipeline, param_grid, cv=3, scoring="neg_mean_squared_error", n_jobs=-1
    )
    logging.info("starting grid search with params: %s", param_grid)
    search.fit(X_train, y_train)
    best = search.best_estimator_
    logging.info("best params: %s", search.best_params_)
    y_pred = best.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    logging.info("evaluation results -- mse: %.6f, r2: %.3f", mse, r2)
    return best


def save_model(model: Pipeline, output_path: str):
    """save trained model to disk"""
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    dump(model, output_path)
    logging.info("model saved at %s", output_path)


def main():
    logging.info("using data file: %s", DATA_PATH)
    # df = load_data(DATA_PATH)
    df = df_test
    df_feat = engineer_features(df)
    feature_cols = [
        "return_lag_1",
        "return_lag_2",
        "return_lag_3",
        "sma_5",
        "volatility_5",
    ]
    X_train, X_test, y_train, y_test = split_data(df_feat, feature_cols, TEST_SIZE)
    model = train_and_evaluate(X_train, X_test, y_train, y_test)
    save_model(model, OUTPUT_PATH)


if __name__ == "__main__":
    main()
