## Canvas de Mapeamento de Fontes de Dados — FinSimples

### Fonte de Dados: Séries Históricas de Mercado à Vista (B3)
1. **Nome da Fonte de Dados**  
   Séries Históricas de Mercado à Vista (B3)

2. **Descrição da Fonte de Dados**  
   Dados diários de preço de abertura, fechamento, máximo, mínimo, preço médio, volume e quantidade de negócios para ativos listados na B3.

3. **Origem dos Dados**  
   Portal Market Data da B3: downloads de arquivos CSV de séries históricas.

4. **Tipo de Dados**  
   - Numéricos: preços, volume, qtd_negócios  
   - Temporais: data de pregão  
   - Categóricos: cod_negociacao, tipo_mercado, moeda

5. **Formato dos Dados**  
   - CSV originais (colunas definidas pela B3)  
   - Convertidos internamente para Parquet (PyArrow)

6. **Frequência de Atualização**  
   Diária, após o encerramento de cada pregão.

7. **Qualidade dos Dados**  
   Alta completude e precisão; eventuais datas faltantes ou tickers descontinuados são tratados no pipeline.

8. **Métodos de Coleta**  
   Ingestão via API **bravi.dev**, que faz download automático dos CSVs e gera artefatos Parquet.

9. **Acesso aos Dados**  
   - Data Lake em S3 (`parquet://bucket/series-b3/`)
   - Acesso via API interna `bravi.dev` ou diretamente pelo filesystem com pandas + pyarrow

10. **Proprietário dos Dados**  
    - B3 (fornecedor oficial)  
    - Equipe de Data Engineering (bravi.dev) para pipeline e manutenção

11. **Restrições de Privacidade e Segurança**  
    Dados públicos; autorização via IAM para leitura/gravação em S3; criptografia em repouso e em trânsito.

12. **Requisitos de Integração**  
    - Parsers compatíveis com pandas/pyarrow  
    - Particionamento por data e ticker  
    - Versionamento de schema e validação automática via CI

---

### Fonte de Dados: API de Ingestão bravi.dev
1. **Nome da Fonte de Dados**  
   API de Ingestão bravi.dev

2. **Descrição da Fonte de Dados**  
   Serviço REST que coleta, transforma e armazena as séries históricas da B3 em Parquet otimizado.

3. **Origem dos Dados**  
   Repositório Git interno `bravi.dev` e orquestração via Cron ou Apache Airflow.

4. **Tipo de Dados**  
   - Logs de execução (JSON/Text)  
   - Configurações (YAML/JSON)  
   - Artefatos de dados (Parquet)

5. **Formato dos Dados**  
   - YAML/JSON para configuração  
   - JSON/Text para logs  
   - Parquet para dados processados

6. **Frequência de Atualização**  
   Diária, em batch de madrugada via chamada agendada à API.

7. **Qualidade dos Dados**  
   - Validação de schema pré e pós transformação  
   - Retries automáticos em caso de falha  
   - Alertas em caso de divergência de volumes

8. **Métodos de Coleta**  
   Orquestração de chamadas REST à API `bravi.dev`, que executa os pipelines de ingestão.

9. **Acesso aos Dados**  
   - Endpoints REST protegidos por autenticação OAuth2  
   - Credenciais gerenciadas via IAM roles

10. **Proprietário dos Dados**  
    Equipe de Data Engineering (bravi.dev) e FinSimples.

11. **Restrições de Privacidade e Segurança**  
    - Pipeline executado em VPC privada  
    - Logs e artefatos criptografados  
    - Acesso controlado por políticas IAM

12. **Requisitos de Integração**  
    - Compatibilidade com PyArrow, AWS S3
    - Configuração via variáveis de ambiente  
    - Integração com CI/CD para deploy de novas versões  
