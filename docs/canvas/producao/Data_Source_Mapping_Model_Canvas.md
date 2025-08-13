## Canvas de Mapeamento de Fontes de Dados — FinSimples

### Fonte de Dados: Séries Históricas de Mercado à Vista (B3)
1. **Nome da Fonte de Dados**  
   Séries Históricas de Mercado à Vista (B3)

2. **Descrição da Fonte de Dados**  
   Dados diários de preço de abertura, fechamento, máximo, mínimo, preço médio, volume e quantidade de negócios para ativos listados na B3.

3. **Origem dos Dados**  
   Portal Market Data da B3: downloads de arquivos CSV de séries históricas.

4. **Tipo de Dados**  
   - **Numéricos:** preços, volume, qtd_negócios  
   - **Temporais:** data de pregão  
   - **Categóricos:** cod_negociacao, tipo_mercado, moeda

5. **Formato dos Dados**  
   - CSV originais (colunas definidas pela B3)  
   - Convertidos internamente para Parquet (`pyarrow`)

6. **Frequência de Atualização**  
   Diária, após o encerramento de cada pregão.

7. **Qualidade dos Dados**  
   Alta completude e precisão; eventuais datas faltantes ou tickers descontinuados são tratados no pipeline.

8. **Métodos de Coleta**  
   Ingestão via scripts internos do FinSimples que acessam `yfinance` e, futuramente, a API oficial da B3 (CSV → Parquet).

9. **Acesso aos Dados**  
   - Diretamente via `yfinance` (API pública)  
   - Arquivos Parquet armazenados localmente (MVP) ou em S3 (futuro)  
   - Leitura com pandas + pyarrow

10. **Proprietário dos Dados**  
    - B3 (fonte oficial)  
    - FinSimples (tratamento e armazenamento)

11. **Restrições de Privacidade e Segurança**  
    Dados públicos; quando armazenados em S3, acesso controlado via IAM; criptografia em repouso e em trânsito.

12. **Requisitos de Integração**  
    - Parsers compatíveis com pandas/pyarrow  
    - Particionamento por data e ticker  
    - Versionamento de schema e validação automática no CI

---

### Fonte de Dados: API de Ingestão (futura)
1. **Nome da Fonte de Dados**  
   API de Ingestão FinSimples (planejada)

2. **Descrição da Fonte de Dados**  
   Serviço REST que unificará coleta de dados da B3 e de outras fontes, armazenando séries históricas em Parquet otimizado.

3. **Origem dos Dados**  
   Scripts internos + conectores para APIs públicas/privadas.

4. **Tipo de Dados**  
   - Logs de execução (JSON/Text)  
   - Configurações (YAML/JSON)  
   - Artefatos de dados (Parquet)

5. **Formato dos Dados**  
   - YAML/JSON para configuração  
   - JSON/Text para logs  
   - Parquet para dados processados

6. **Frequência de Atualização**  
   Diária, em batch, após fechamento do pregão.

7. **Qualidade dos Dados**  
   - Validação de schema pré e pós transformação  
   - Retries automáticos em caso de falha  
   - Alertas em caso de divergência

8. **Métodos de Coleta**  
   Orquestração de chamadas REST à API, que executa os pipelines de ingestão.

9. **Acesso aos Dados**  
   - Endpoints REST autenticados (OAuth2)  
   - Credenciais gerenciadas via IAM

10. **Proprietário dos Dados**  
    FinSimples.

11. **Restrições de Privacidade e Segurança**  
    - Execução em ambiente seguro (VPC privada)  
    - Logs e artefatos criptografados  
    - Controle de acesso via IAM

12. **Requisitos de Integração**  
    - Compatibilidade com PyArrow e AWS S3  
    - Configuração via variáveis de ambiente  
    - Integração com CI/CD
