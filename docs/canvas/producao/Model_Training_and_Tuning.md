# Canvas de Treinamento e Ajuste do Modelo — FinSimples

## 1. Objetivo do Modelo
**Prever o retorno percentual de ativos da B3 no dia seguinte, permitindo projeções “one‑click” de retorno para investidores, com alta confiabilidade e tempo de resposta ≤ 2 s.**

---

## 2. Dados para Treinamento
- **Fonte**: Séries históricas diárias da B3 (CSV transformado em Parquet).  
- **Tipo**: Dados estruturados (date, ticker, OHLC, volume, qtd_negócios).  
- **Volume**: ~1,5 milhões de registros (300 tickers × ~5 anos de pregões).  
- **Pré‑processamento**:
  - Conversão para `datetime64` (`parse_dates=["date"]`).  
  - Ordenação por ticker e data.  
  - Geração de features: retorno diário, lags (1, 2, 3, 5, 10 dias), SMA5, volatilidade5.  
  - Drop de linhas com `NaN` em features ou target.  

---

## 3. Estratégia de Treinamento
- **Modelo base**: RandomForestRegressor  
- **Configuração inicial**:
  - `n_estimators=100`, `max_depth=10`, `random_state=42`, `n_jobs=-1`  
- **Pipeline**: `StandardScaler` → `RandomForest`  
- **Ferramentas**: Python 3.10, scikit‑learn, pandas, numpy, joblib  

---

## 4. Ajuste Fino (Fine‑Tuning)
- **GridSearchCV** sobre:
  - `rf__n_estimators`: [100, 200]  
  - `rf__max_depth`: [5, 10, None]  
  - `cv=3`, `scoring="neg_mean_squared_error"`  
- **AutoML (opcional)**:
  - TPOTRegressor com `generations=2`, `population_size=20`, `max_time_mins=10`, `max_eval_time_mins=1`  
  - Custom config limitado a RandomForest e XGBoost  

---

## 5. Métricas de Avaliação
- **MSE** (mean_squared_error) — quanto menor, melhor  
- **R²** (r2_score) — meta: ≥ 0.10 em validação  
- **Ferramenta**: funções do `sklearn.metrics`  

---

## 6. Ciclo de Validação
- **Split cronológico**:
  - 80% dos dados → treino  
  - 20% → teste  
- **Validação cruzada interna**:
  - `GridSearchCV(cv=3)` respeitando sequência temporal  
- **Alternativa recomendada**:
  - `TimeSeriesSplit(n_splits=5)` para validação mais robusta  

---

## 7. Ajustes Necessários
- Aumentar `n_estimators` se underfitting  
- Ajustar `max_depth` para controlar overfitting  
- Incluir features adicionais (RSI, MACD, volume lags)  
- Avaliar redução de complexidade (feature selection)  

---

## 8. Registro de Iterações
| Iteração | Parâmetros principais                      | MSE      | R²     |
|----------|---------------------------------------------|----------|--------|
| 1        | RF(100 trees, max_depth=10)                | 0.00230  | 0.12   |
| 2        | GridSearch → RF(200 trees, max_depth=5)    | 0.00185  | 0.15   |
| 3        | TPOT (gens=2, pop=20, limit 10 min)         | 0.00170  | 0.17   |

---

## 9. Ferramentas e Recursos
- **Frameworks**: scikit‑learn, TPOT (autoML opcional)  
- **Infra**: CPU multicore (4 vCPU), 16 GB RAM  
- **Armazenamento**: Parquet em S3 ou local via PyArrow  
- **CI/CD**: GitHub Actions para retraining agendado  

---

## 10. Time e Responsabilidades
- **Cientista de Dados**: Definição de features, configuração de treino e análise de métricas  
- **Engenheiro de Dados**: Ingestão das séries B3, conversão para Parquet e pipelines de pré‑processamento  
- **ML Engineer**: Implementação do pipeline, ajuste de hiperparâmetros e deploy do modelo  
- **DevOps/Infra**: Configuração de servidores, CI/CD e monitoramento pós‑deploy  

---

**Periodicidade de Revisão**: a cada mudança significativa nos dados ou performance do modelo (mínimo quinzenal)  
