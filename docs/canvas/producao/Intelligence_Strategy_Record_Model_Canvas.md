# Registro de Estratégia de Inteligência — FinSimples

---

## 1. Objetivo da Inteligência
- Prever o **retorno percentual do periodo escolhido pelo usuario** para ativos da B3, entregando projeções rápidas e confiáveis que acelerem a tomada de decisão dos investidores.

---

## 2. Abordagem Técnica Principal
- [X] Treinamento de Modelo Customizado  
- [ ] Fine‑Tuning de Modelo de Fundação  
- [ ] RAG (Retrieval‑Augmented Generation)  
- [ ] Engenharia de Prompt Avançada  
- [ ] Outra: ________________

---

## 3. Componentes Chave da Arquitetura
- **Fonte de Dados:** Séries Históricas da B3 em Parquet (via API bravi.dev)  
- **DataLoader:** `load_data()` com pandas + pyarrow  
- **Feature Engineering:** `engineer_features()` (retorno diário, lags, SMA5, volatilidade5)  
- **Pipeline de ML:** `StandardScaler` → `RandomForestRegressor` 
- **Otimização de Hiperparâmetros:** `GridSearchCV`
- **Persistência de Modelo:** `save_model()` com joblib → Model Store (S3 ou local)  
- **Inferência em Produção:** Serviço FastAPI carregando `.joblib`

---

## 4. Fonte de Dados / Conhecimento
- **Volume:** ~1,5 milhão de registros (300 tickers × ~5 anos de pregões)  
- **Colunas Principais:** `date`, `cod_negociacao`, `preco_abertura`, `preco_maximo`, `preco_minimo`, `preco_medio`, `preco_fechamento`, `volume`, `qtd_negocios`  
- **Estrutura:** Dados históricos estruturados, semiestruturados após feature engineering

---

## 5. Estratégia de Avaliação
- **Métricas Quantitativas:**  
  - MSE ≤ 0.002  
  - R² ≥ 0.15  
- **Validação:**  
  - `TimeSeriesSplit(n_splits=5)`  
  - Hold‑out 20% final  
- **Teste de Cenários Críticos:**  
  - Backtest em períodos de alta volatilidade (ex: 2020–2021)

---

## 6. Ferramentas e Time
- **Ferramentas:** Python 3.10, pandas, numpy, scikit‑learn, TPOT, joblib, FastAPI, PyArrow, AWS S3  
- **Time:**  
  - Cientista de Dados: definição de features e análise de métricas  
  - ML Engineer: implementação de pipeline, AutoML e deploy  
  - Engenheiro de Dados: ingestão e qualidade das séries B3 via bravi.dev  
  - DevOps: infra de CI/CD, monitoramento e agendamento de retraining  
