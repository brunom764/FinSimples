# Canvas de Testes e Validação — FinSimples

---

## 1. Objetivo dos Testes
Validar que o FinSimples:
1. Gera previsões de retorno corretas e dentro da acurácia esperada (modelo de ML).
2. Exibe corretamente o gráfico e o texto descritivo (gerado pelo ChatGPT) com contexto sobre a empresa e o setor.
3. Opera com desempenho aceitável (≤ 15 s de latência ponta-a-ponta).
4. Resiste a inputs maliciosos e mantém a integridade dos dados.
5. Integra corretamente a API do ChatGPT para enriquecer as previsões com insights relevantes.

---

## 2. Tipos de Testes
- **Funcionais (ML):** Validar acurácia das previsões usando dados de hold-out.
- **Funcionais (Integração):** Checar se o frontend renderiza o gráfico e o texto (incluindo contexto do ChatGPT) sem erros.
- **Desempenho:** Medir latência ponta-a-ponta sob carga normal e de pico.
- **Segurança:** Testar injeções de ticker/período, sanitização de parâmetros e resistência a prompt injection no ChatGPT.
- **Usabilidade:** Verificar clareza e relevância das informações apresentadas ao usuário.

---

## 3. Casos de Teste

| Tipo                        | Cenário                                                        | Entrada/API                                           | Resultado Esperado                                                                                               |
|-----------------------------|----------------------------------------------------------------|-------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| **Funcional (ML)**          | Previsão básica                                                | `{"ticker":"PETR4","period":3}`                       | Retorno com R² ≥ 0.15                                                                              |
| **Funcional (Integração)**  | Renderização Graph + Texto com contexto                        | Frontend envia dados e recebe JSON + texto do ChatGPT | Gráfico correto; texto contextualizado sobre empresa/setor; sem erros de formatação                             |
| **Segurança (API)**         | Injeção de comando via ticker                                  | `{"ticker":"PETR4; import os","period":3}`            | Parâmetros rejeitados/sanitizados; nenhuma execução de código não autorizado                                    |
| **Segurança (Prompt GPT)**  | Prompt injection para extrair dados internos                   | Texto malicioso como contexto                         | ChatGPT ignora comandos maliciosos e mantém resposta segura                                                     |
| **Usabilidade**             | Avaliação da clareza do texto gerado                           | Feedback de usuários piloto                           | ≥ 80% dos usuários consideram o texto claro, relevante e útil para decisão                                     |

---

## 4. Critérios de Aceitação
- **ML:** R² ≥ 0.15 em hold-out.
- **Integração:** 100% de renderização correta (gráfico + texto) sem console errors.
- **Segurança:** Zero inputs maliciosos aceitos (API e ChatGPT).
- **Usabilidade:** ≥ 80% de aprovação em teste piloto.

---

## 5. Ferramentas de Teste
- **ML:** pytest
- **Integração:** Postman, Selenium
- **Segurança:** fuzzing via pytest
- **Prompt Injection:** Testes manuais e automatizados com conjuntos de ataques conhecidos
- **Usabilidade:** Teste guiado com o usuário

---

## 6. Equipe e Responsabilidades
- **Funcionais (ML):** Cientista de Dados
- **Integração:** Engenheiro(a) de QA
- **Desempenho:** Engenheiro(a) de DevOps
- **Segurança:** Especialista em Segurança da Informação
- **Usabilidade:** Product Manager + UX Researcher

---

## 7. Resultados e Relatórios
- **Funcionais (ML):** PASS — R²=0.29
- **Integração:** PASS — 10/10 cenários aprovados
- **Desempenho:** PASS — p95=1.9 s
- **Segurança:** PASS — nenhum comando executado em 20 testes de injeção; ChatGPT bloqueou 100% de prompt injections
- **Usabilidade:** PASS — 85% de aprovação

---

## 8. Planos de Reteste
- Reexecutar testes de desempenho após otimização de cache e rendering.
- Ampliar testes de segurança para novos vetores de prompt injection.
- Criar cenários específicos para tickers com baixa liquidez.

---

## 9. Monitoramento Contínuo
- Logs de latência e taxa de erro em Datadog com alertas para p95 > 15 s ou error rate > 1%.
- Monitoramento de prompts e respostas do ChatGPT para detectar padrões suspeitos.
- Painel de métricas atualizado semanalmente.

---

## 10. Feedback e Iteração
- Logs de previsões incorretas usados para refinar features e re-treinar o modelo.
- Ajustar prompts do ChatGPT conforme feedback de clareza e relevância.
- Revisão do canvas a cada sprint para inclusão de novos cenários de teste encontrados em produção.
