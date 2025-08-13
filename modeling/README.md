# Modeling

Este diretório concentra os notebooks e utilitários de preparação, análise exploratória e modelagem preditiva usados no projeto.

## Estrutura

- `analise/`
  - `analise.ipynb`: notebook de análise exploratória das cotações (EDA) com checagens de integridade, outliers, liquidez e retornos.
  - `datasets/`: amostras e bases intermediárias para exploração (ex.: `cotacoes_resumidas_2018.csv`).
  - `utils/`: scripts auxiliares de transformação (ex.: conversões CSV/Parquet, concatenação e agregações).
- `src/`
  - `train.ipynb`: notebook de features e treinamento de modelos de previsão de retorno (Random Forest e XGBoost), com validação temporal.
  - `datasets/`: bases usadas no treino/validação (ex.: `acoes_semanais.csv`, `acoes_consolidadas_20.csv`).
  - `utils/`: artefatos e utilidades do treino (ex.: serialização de feature extractors/modelos).

Pré-requisitos gerais:
- Python 3.10+ (o kernel exibido nos notebooks é 3.13.1) e Jupyter.
- Instalar dependências do projeto (na raiz):
  
  ```bash
  pip install -r requirements.txt
  ```

Observação sobre dados:
- Os caminhos dos CSV/Parquet usados nos notebooks assumem a estrutura do repositório. Ajuste o path se você estiver executando em outro ambiente.

---

## `analise/analise.ipynb`

Objetivo: examinar a qualidade dos dados de cotações e produzir indicadores básicos para subsidiar o preparo do dataset de modelagem.

Entradas típicas:
- `analise/datasets/cotacoes_resumidas_*.csv` ou equivalentes.

Principais etapas implementadas:
- Leitura do dataset e inspeções iniciais
  - `df.head()`, `df.isnull().sum()`, `df.dtypes`, `df.describe()`.
- Checagens de integridade
  - Validação de regras: `preco_maximo ≥ preco_minimo`; `preco_medio ∈ [min, max]`.
  - Sinalização de valores negativos em colunas-chave e fechamentos iguais a zero.
- Sinalização de outliers
  - Preço: flags para `preco_medio > 100.000` (suspeito) e `< 0,01`.
  - Volume: detecção por quantil alto (`p99.9`).
- Liquidez por ticker (agregação diária)
  - Medianas de `qtd_negocios` e `volume` e contagem de `dias` por `cod_negociacao`.
  - Lista de tickers mais líquidos (`top_liquidos`).
- Retornos e “mercado” equal-weight
  - `retorno = pct_change(fechamento)` por ticker.
  - Construção de um índice de mercado equal-weight com média simples de retornos entre `top_liquidos`.

Como executar:
1) Abra o notebook e ajuste o caminho do(s) arquivo(s) de entrada, se necessário.
2) Execute as células em ordem. Caso o kernel consuma muita memória, reduza a amostra de dados (período ou número de tickers) antes das agregações.

Saídas esperadas:
- Tabelas/resumos estatísticos de integridade e outliers.
- Ranking de liquidez (medianas) por ticker.
- Estatísticas descritivas do retorno de mercado equal-weight.

Dicas de performance:
- Reduza o conjunto de tickers para as análises de correlação ou aumente o filtro de liquidez.
- Limite o período por intervalo de datas ao carregar os dados.

---

## `src/train.ipynb`

Objetivo: preparar features e treinar modelos para previsão de retorno futuro por ativo com validação temporal.

Entradas típicas:
- `src/datasets/acoes_consolidadas_20.csv` (ou semelhante) para exemplos semanais/diários.
- `src/datasets/acoes_semanais.csv` para a pipeline “full” de treino com validação temporal.

Definição do target:
- `retorno_futuro`: retorno percentual à frente (padrão: 52 períodos/semanas) calculado por ativo, com recorte de outliers via quantis (ex.: 1% e 99%).

Extração de features (principais):
- Médias móveis: `media_4w`, `media_8w`, `media_12w`, `media_26w`.
- Volatilidade rolling: `vol_*w` com janelas paralelas às médias.
- Retornos defasados/ao longo de janelas: `retorno_4w`, `retorno_12w`, `retorno_26w` (com proteção contra divisão por zero).
- Indicadores adicionais: `ema_12` (exponencial) e, em versões do notebook, `rsi_14`.
- Features de volume: `volume_medio_4w`, `volume_medio_12w`.

Pré-processamento:
- Sub-pipeline com `SimpleImputer(strategy='median')` e `StandardScaler()`.
- Remoção/clip de outliers no target.
- Limpeza final: substituição de inf por NaN e `dropna` antes do treino/validação.

Modelos disponíveis:
- Random Forest (versão principal)
  - Pipeline: `imputer + scaler + RandomForestRegressor`.
  - Hiperparâmetros iniciais: `n_estimators=300–400`, `max_depth=8`, `min_samples_leaf=5`, `n_jobs=-1`, `random_state=42`.
  - Validação: `TimeSeriesSplit(n_splits=3)` com R² por fold e média/±desvio.
- XGBoost (alternativo)
  - Versões no notebook com early stopping e também com treino final (sem early stopping) para produção.
  - Hiperparâmetros iniciais: `n_estimators≈300–500`, `learning_rate=0.05`, `max_depth=6`, `subsample=0.9`, `colsample_bytree=0.8`, `eval_metric='rmse'`.
  - Validação: `TimeSeriesSplit` e uso de `eval_set` para early stopping nas versões de treino por fold.
- Transformers (adaptado a tabular)

Como executar (exemplos):
- Random Forest (pipeline completo):
  
  ```python
  modelo_rf, X_rf, y_rf, fx = main_rf("datasets/acoes_semanais.csv")
  ```
  
- Random Forest (a partir de um DataFrame já carregado):
  
  ```python
  modelo = treinar_modelo_rf(df_semanal)
  ```
  
- XGBoost (pipeline completo):
  
  ```python
  modelo_xgb, X_data, y_data = main("datasets/acoes_semanais.csv")
  ```

Avaliação e interpretação:
- Métrica de avaliação: R² por fold em validação temporal.
- Importância de features: há funções utilitárias para plotar importâncias (quando disponíveis no modelo). Em RF/XGB, utilize `feature_importances_`.

Artefatos e persistência (quando aplicável):
- O notebook inclui exemplos para salvar modelo (ex.: `modelo_xgb_treinado.json`) e serializar o extrator de features (Pickle) para reuso.

Dicas de performance/estabilidade:
- Se o treino ficar pesado, reduza o conjunto de ativos/período, ou ajuste `n_estimators` e profundidade.
- Para validação temporal com muitos ativos, considere usar apenas tickers mais líquidos.
- O early stopping no XGBoost exige `eval_set`; quando usar Pipeline, certifique-se de transformar os dados de validação com o mesmo pré-processador antes de passar ao `eval_set`.
