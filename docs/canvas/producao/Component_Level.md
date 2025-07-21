# Diagrama de Componentes para Serviço de Previsão de Retorno FinSimples

```mermaid
graph LR
  subgraph 🟦 Processamento
    DL[DataLoader] 
    FE[Feature Engineering]
    MT[ModelTrainer]
    PR[Predictor]
  end

  subgraph 🟩 Dados
    HS[Histórico Parquet]
    MS[ModelStore]
  end

  subgraph 🟧 API
    REST[REST API]
  end

  subgraph ⚙️ Orquestração
    SCH[Scheduler]
  end

  HS --> DL
  DL --> FE
  FE --> MT
  MT --> MS
  MS --> PR
  FE --> PR
  PR --> REST
  SCH --> MT
````

### Descrição dos Componentes

| Componente              | Função                                                                | Tecnologia                         |
| ----------------------- | --------------------------------------------------------------------- | ---------------------------------- |
| **DataLoader**          | Carrega arquivos Parquet com séries históricas da B3                  | `pandas` + `pyarrow`               |
| **Feature Engineering** | Gera retornos (%), lags, médias móveis e volatilidade                 | `pandas`                           |
| **ModelTrainer**        | Treina o modelo (GridSearchCV ou TPOT AutoML) e versiona o pipeline   | `scikit-learn` / `TPOT` / `joblib` |
| **Predictor**           | Aplica o modelo treinado a novos dados para gerar previsão de retorno | `scikit-learn` / `joblib`          |
| **ModelStore**          | Armazena pipelines treinados em disco                            | `joblib`                      |
| **REST API**            | Expondo endpoint de previsão (“ativo + período → retorno projetado”)  | `FastAPI`                          |
| **Scheduler**           | Agenda re-treinos periódicos e atualização automática de modelos      | `cron` ou `Apache Airflow`         |
| **Histórico Parquet**   | Conjunto de dados compactado de séries históricas baixadas da B3      | `parquet` via `pyarrow`            |

### Legenda de Cores/Símbolos

* 🟦 **Processamento**: transformações e treino
* 🟩 **Dados**: armazenamento de séries e modelos
* 🟧 **API**: interface externa de consumo
* ⚙️ **Orquestração**: agendamento de pipelines e jobs
