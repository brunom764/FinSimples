# Diagrama de Contexto para FinSimples

```mermaid
graph LR
  Investidor[👤 Investidor] -->|Seleciona ativo e período| FS[💼 FinSimples<br/>Assistente de Previsão de Retorno]
  FS -->|Retorno projetado + riscos| Investidor
  FS -->|Requisita séries históricas| B3[🏦 B3 Data Service]
  B3 -->|Fornece dados Parquet| FS
  Corretora[🤝 Corretora/Parceiro] -->|Chama API de previsão| FS
  FS -->|JSON com projeção| Corretora
````

### Interações Principais

| Ator                   | Interação                                              | Notas                                      |
| ---------------------- | ------------------------------------------------------ | ------------------------------------------ |
| **Investidor**         | Seleciona ativo e período; recebe projeção             | Usuário via Frontend Next.js               |
| **B3 Data Service**    | API/FTP de séries históricas; fornece dados históricos | Fonte oficial das séries da B3             |
| **Corretora/Parceiro** | Consome API REST para obter projeção; processa JSON    | Integração B2B para plataformas de trading |

### Legenda de Cores/Símbolos

* 👤 **Usuário**: ator humano
* 🏦 **Provedor de Dados**: fonte de séries históricas
* 🤝 **Parceiro**: consumidor de API de projeção
* 💼 **Sistema**: contêiner central do FinSimples
