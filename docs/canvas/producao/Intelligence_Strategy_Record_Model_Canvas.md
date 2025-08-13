# Registro de Estratégia de Inteligência — FinSimples

---

## 1. Objetivo da Inteligência
- Prever o **retorno percentual do período escolhido pelo usuário** para ativos da B3, entregando projeções rápidas e confiáveis que acelerem a tomada de decisão dos investidores, complementadas com **contexto sobre a empresa e o setor** e **alertas de atenção** gerados via ChatGPT.

---

## 2. Abordagem Técnica Principal
- [X] Treinamento de Modelo Customizado  
- [ ] Fine-Tuning de Modelo de Fundação  
- [ ] RAG (Retrieval-Augmented Generation)  
- [X] Engenharia de Prompt Avançada (para narrativa e alertas)  
- [ ] Outra: ________________

---

## 3. Componentes Chave da Arquitetura
- **Fonte de Dados:** Séries Históricas da B3 (via `yfinance` e, futuramente, API oficial B3)  
- **DataLoader:** `load_data()` com pandas + pyarrow  
- **Feature Engineering:** `engineer_features()` (retorno diário, lags, SMA5, volatilidade5)  
- **Pipeline de ML:** `XGBoostRegressor`  
- **Otimização de Hiperparâmetros:** `GridSearchCV` / TPOT (experimentos)  
- **Geração de Narrativa e Alertas:** Prompt estruturado → ChatGPT (OpenAI API)  
- **Persistência de Modelo:** `save_model()` com joblib → Model Store (S3 ou local)  
- **Inferência em Produção:** Serviço FastAPI carregando `.joblib` e compondo resposta final com narrativa LLM

---

## 4. Fonte de Dados / Conhecimento
- **Volume:** ~1,5 milhão de registros (300 tickers × ~5 anos de pregões)  
- **Colunas Principais:**  
  `date`, `cod_negociacao`, `preco_abertura`, `preco_maximo`, `preco_minimo`, `preco_medio`, `preco_fechamento`, `volume`, `qtd_negocios`  
- **Estrutura:** Dados históricos estruturados; complementados com metadados contextuais (empresa/setor) extraídos de fontes públicas e interpretados pelo LLM

---

## 5. Estratégia de Avaliação
- **Métricas Quantitativas:**  
  - R² ≥ 0.29  
- **Validação:**  
  - `TimeSeriesSplit(n_splits=5)`  
  - Hold-out 20% final  
- **Teste de Cenários Críticos:**  
  - Backtest em períodos de alta volatilidade (ex.: 2020–2021)  
- **Métricas Qualitativas:**  
  - Clareza e utilidade das narrativas e alertas (meta ≥ 4/5 em avaliação de usuários)  
  - % de usuários que consideram os alertas relevantes (meta ≥ 70%)

---

## 6. Ferramentas e Time
- **Ferramentas:** Python 3.10, pandas, numpy, scikit-learn, TPOT, joblib, FastAPI, PyArrow, AWS S3, OpenAI API (ChatGPT)  
- **Time:**  
  - **Cientista de Dados:** definição de features e análise de métricas  
  - **ML Engineer:** implementação de pipeline, AutoML, integração de modelo no backend  
  - **Engenheiro de Dados:** ingestão e qualidade das séries históricas  
  - **Especialista em Prompt Engineering:** criação e otimização de prompts para o ChatGPT gerar contexto e alertas
