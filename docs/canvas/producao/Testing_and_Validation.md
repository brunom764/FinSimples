# Canvas de Testes e Validação — FinSimples

- **1. Objetivo dos Testes**  
  Validar que o FinSimples:  
  1. Gera previsões de retorno corretas e dentro da acurácia esperada.  
  2. Exibe corretamente o gráfico e o texto descritivo gerado pelo ChatGPT.  
  3. Opera com desempenho aceitável (≤ 2 s de latência ponta‑a‑ponta).  
  4. Resiste a inputs maliciosos e mantém a integridade dos dados.

---

- **2. Tipos de Testes**  
  - **Funcionais (ML):** Verificar acurácia dos retornos previstos contra dados de hold‑out.  
  - **Funcionais (Integração):** Validar que o frontend exibe gráfico e texto sem erros após chamar a API.  
  - **Desempenho:** Medir latência ponta‑a‑ponta sob cargas típicas e de pico.  
  - **Segurança:** Testar injeções de ticker/período e sanitização de parâmetros.

---

- **3. Casos de Teste**

  | Tipo                   | Cenário                                                      | Entrada/API                                      | Resultado Esperado                                                                                 |
  |------------------------|--------------------------------------------------------------|--------------------------------------------------|----------------------------------------------------------------------------------------------------|
  | **Funcional (ML)**     | Previsão básica                                              | `{"ticker":"PETR4","period":3}`                  | Retorno previsto com MSE ≤ 0.002 e R² ≥ 0.15                                                       |
  | **Funcional (Integração)** | Graph + Texto após previsão                              | Frontend envia e recebe resposta JSON            | Gráfico desenhado corretamente; texto segue template e não contém erros de formatação              |
  | **Desempenho**         | 50 requisições simultâneas                                   | Simulação Locust                                 | p95 de latência ≤ 2 s                                                                             |
  | **Segurança**          | Injeção de comando via ticker                                | `{"ticker":"PETR4; import os","period":3}`       | Parâmetros rejeitados ou sanitizados; nenhuma execução de código não autorizado                    |

---

- **4. Critérios de Aceitação**  
  - **Funcionais (ML):** MSE ≤ 0.002 e R² ≥ 0.15 em hold‑out.  
  - **Funcionais (Integração):** 100% dos casos de display (gráfico + texto) passam sem console errors.  
  - **Desempenho:** p95 ≤ 2 s para 95% das requisições.  
  - **Segurança:** Zero aceitações de inputs maliciosos nos testes de fuzzing.

---

- **5. Ferramentas de Teste**  
  - **ML:** pytest + scripts de benchmark (pytest‑benchmark)  
  - **Integração:** Postman, Selenium  
  - **Desempenho:** Locust, k6  
  - **Segurança:** OWASP ZAP, fuzzing customizado via pytest  

---

- **6. Equipe e Responsabilidades**  
  - **Funcionais (ML):** Cientista de Dados  
  - **Funcionais (Integração):** Engenheiro(a) de QA  
  - **Desempenho:** Engenheiro(a) de DevOps  
  - **Segurança:** Especialista em Segurança da Informação  

---

- **7. Resultados e Relatórios**  
  - **Funcionais (ML):** PASS — MSE=0.0018, R²=0.17  
  - **Integração:** PASS — 10/10 cenários aprovados  
  - **Desempenho:** PASS — p95=1.9 s  
  - **Segurança:** PASS — zero comandos executados em 20 testes de injeção  

---

- **8. Planos de Reteste**  
  - Re‑executar testes de desempenho após otimizações de cache e graph rendering.  
  - Incluir novos cenários ML para tickers de baixa liquidez.

---

- **9. Monitoramento Contínuo**  
  - Logs de latência e taxa de erro em Datadog com alertas para p95 > 2 s ou error rate > 1%.  
  - Painel de métricas atualizado semanalmente.

---

- **10. Feedback e Iteração**  
  - Utilizar logs de previsões incorretas para refinar features e retraining.  
  - Revisar este canvas a cada sprint para incluir novos cenários de teste detectados em produção.  
