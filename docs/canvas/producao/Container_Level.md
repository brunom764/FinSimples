# Diagrama de Contêiner para FinSimples

```mermaid
graph LR
  subgraph 🖥️ UI
    FE[Frontend<br/>Next.js]
  end

  subgraph 🌐 API
    API[API Gateway<br/>FastAPI]
  end

  subgraph 🤖 ML
    ML[Serviço de ML<br/>FastAPI + scikit-learn]
  end

  subgraph 💾 Storage
    DS[Data Lake<br/>Parquet via PyArrow / S3]
    MS[Model Store<br/>joblib / S3]
  end

  subgraph 🗓️ Scheduler
    SCH[Scheduler<br/>Cron / Apache Airflow]
  end

  FE --> API
  API --> ML
  ML --> DS
  ML --> MS
  SCH --> ML
````

### Descrição dos Contêineres

| Contêiner         | Função                                                                   | Tecnologia                            |
| ----------------- | ------------------------------------------------------------------------ | ------------------------------------- |
| **Frontend**      | Interface para seleção de ativo e período, e exibição de projeções       | Next.js                               |
| **API Gateway**   | Recebe requisições do frontend e encaminha para o serviço de ML          | FastAPI                               |
| **Serviço de ML** | Realiza pré-processamento, inferência de retorno e retraining de modelos | Python, scikit-learn, TPOT (opcional) |
| **Data Lake**     | Armazena séries históricas convertidas em Parquet para acesso eficiente  | Parquet via PyArrow, AWS S3           |
| **Model Store**   | Persiste pipelines treinados (arquivos .joblib) para uso em produção     | joblib, AWS S3                        |
| **Scheduler**     | Agenda retraining periódico dos modelos e atualização de pipelines       | Cron ou Apache Airflow                |

### Legenda de Cores/Símbolos

* 🖥️ **UI**: interface de usuário
* 🌐 **API**: lógica de transporte e exposição de serviços
* 🤖 **ML**: processamento de machine learning
* 💾 **Storage**: armazenamento de dados e modelos
* 🗓️ **Scheduler**: orquestração de tarefas agendadas

