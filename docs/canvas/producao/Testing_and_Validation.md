# Canvas de Testes e Validação — FinSimples

## 1. Objetivo dos Testes
Validar que o FinSimples:
- Gera projeções de retorno corretas e confiáveis para ativos B3.
- Responde dentro do SLA de ≤ 2 segundos sob carga normal.
- Protege dados sensíveis (sem exposições ou vulnerabilidades).
- Oferece interface clara e sem erros para o usuário final.

---

## 2. Tipos de Testes
- **Funcionais**  
  - Verificar a exatidão das previsões para diferentes tickers e períodos.
  - Garantir mensagens de erro apropriadas para entradas inválidas.
- **Desempenho (Performance)**  
  - Latência de API sob carga (até 50 usuários simultâneos).  
  - Throughput (req/s) estável com base no pico de uso esperado.
- **Segurança**  
  - Testes de injeção (SQL, comando) e XSS nos endpoints.  
  - Autenticação/autorização de acesso à API.
- **UX/UI**  
  - Usabilidade da interface de input (código + período).  
  - Acessibilidade (contraste, navegação por teclado).

---

## 3. Casos de Teste

| Tipo           | Cenário                                                      | Entrada                                    | Ação Esperada                                               | Resultado Esperado                                    |
|----------------|--------------------------------------------------------------|--------------------------------------------|-------------------------------------------------------------|-------------------------------------------------------|
| **Funcional**  | Previsão válida                                             | `"PETR4 3"`                                | Calcular retorno e exibir card                              | Card com retorno % e riscos listados                  |
| **Funcional**  | Ticker inválido                                             | `"ZZZZ3 2"`                                | Detectar erro e avisar usuário                             | Mensagem “Ticker não encontrado. Tente outro código.” |
| **Desempenho** | 50 reqs simultâneas                                         | 50 chamadas paralelas ao `/predict`        | Balancear carga sem timeouts                               | 95% das respostas ≤ 2 s                                |
| **Desempenho** | Consulta em dataset grande                                 | Prever usando 1 milhão de registros        | Processar com caching e pipeline otimizado                 | Latência ≤ 3 s                                         |
| **Segurança**  | SQL Injection via parâmetro ticker                         | `"' OR '1'='1"`                            | Sanitizar input antes de query                             | Nenhuma consulta indesejada executada                 |
| **UX/UI**      | Navegação via teclado                                       | Tab + Enter para enviar                    | Form validado e disparar previsão                          | Previsão exibida sem uso de mouse                     |

---

## 4. Critérios de Aceitação
- **Funcionais**  
  - Precisão das previsões ≥ 90% em testes com base histórica.  
  - Tratamento de erros com mensagens claras.  
- **Desempenho**  
  - 95% das requisições respondidas em ≤ 2 segundos.  
  - Throughput ≥ 20 req/s sustentado por 5 minutos.  
- **Segurança**  
  - Zero vulnerabilidades críticas em scan OWASP ZAP.  
- **UX/UI**  
  - Pontuação de usabilidade ≥ 80/100 em testes com 10 usuários.

---

## 5. Ferramentas de Teste
- **Funcionais**: pytest + requests + Postman  
- **Desempenho**: Locust ou JMeter  
- **Segurança**: OWASP ZAP, Burp Suite  
- **UX/UI**: Maze (testes remotos), Lighthouse (acessibilidade)

---

## 6. Equipe e Responsabilidades
| Tipo de Teste    | Responsável                     |
|------------------|---------------------------------|
| Funcionais       | Engenheiro(a) de QA            |
| Desempenho       | Engenheiro(a) de Performance    |
| Segurança        | Especialista em Segurança       |
| UX/UI            | Designer de Experiência do Usuário |

---

## 7. Resultados e Relatórios

| Cenário                 | Status   | Observações                                  |
|-------------------------|----------|----------------------------------------------|
| Funcional “PETR4 3”     | Aprovado | 80% de acurácia em 50 casos históricos      |
| Funcional ticker inválido | Aprovado | Mensagem de erro exibida corretamente        |
| Desempenho 50 reqs      | Aprovado | 100% respostas ≤ 2 s                           |
| Desempenho grande data  | Falha    | Latência média de 3,5 s (precisa otimização) |
| Segurança SQL Injection | Aprovado | Input sanitizado; zero payloads executados    |
| UX Teste teclado        | Aprovado | Fluxo completo sem mouse                     |

---

## 8. Planos de Reteste
- **Desempenho dataset grande**:  
  - Implementar caching de resultados e índices de data;  
  - Retestar com JMeter após otimização.  
- **Cenários UX**:  
  - Ajustar foco automático em input field;  
  - Retestar navegação com 10 novos usuários.

---

## 9. Monitoramento Contínuo
- Configurar alertas em Grafana/Sentry para:  
  - Latência média > 2 s por 5 minutos seguidos  
  - Taxa de erros > 1%  
- Relatórios mensais de logs de API e feedback de usuários.

---

## 10. Feedback e Iteração
- Coleta de feedback via pop-up no card de previsão (👍/👎 + comentário).  
- Sessões quinzenais de revisão com equipe de QA e produto.  
- Ajustes contínuos no backlog de desenvolvimento com base nos resultados de teste.
