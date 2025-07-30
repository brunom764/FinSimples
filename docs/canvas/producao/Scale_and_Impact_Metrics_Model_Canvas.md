# Canvas de Métricas de Escala e Impacto — FinSimples

---

## 1. Objetivo do Monitoramento
Monitorar o efeito do FinSimples na agilidade e qualidade da decisão de investimento dos usuários-piloto e garantir a estabilidade técnica da solução.

---

## 2. Métricas de Uso
- **Número de previsões diárias:** 50 (2 investidores piloto)  
- **Usuários ativos por semana:** 2 (100% do grupo piloto)  
- **Taxa de adoção:** 100% (grupo piloto não usa mais planilhas manuais)

---

## 3. Métricas de Desempenho
- **Tempo médio de resposta da API:** 1,8 s  
- **Taxa de erro da API** (HTTP 5xx ou falha de inferência): 4%  
- **Latência do modelo (p95):** 1,2 s  

---

## 4. Métricas de Impacto no Negócio
- **Tempo economizado por previsão:** ~10 min por investidor (eliminação de cálculos manuais)  
- **Redução do tempo de decisão:** 50% em média comparado ao método anterior  
- **Consistência das decisões:** 0% de discrepâncias reportadas em testes de backtest

---

## 5. Métricas de Satisfação do Usuário
- **CSAT Médio:** 9,2 / 10  
- **Feedback Qualitativo:** “Ajuda a entender tendências sem montar planilhas complexas.”  

---

## 6. Ferramentas de Monitoramento
- **Datadog:** métricas de latência, CPU e erros  
- **Sentry:** trackers de exceções e falhas de inferência  
- **Kibana/Elasticsearch:** análise de logs de requisição  
- **Entrevistas semanais:** feedback direto dos investidores piloto  

---

## 7. Benchmarks
- **Tempo médio de resposta ideal:** ≤ 2 segundos  
- **Taxa de erro ideal:** < 5%  

---

## 8. Acompanhamento de Tendências
- Relatórios semanais de uso e performance  
- Crescimento de ~20% nas previsões semanais indica necessidade de escalar em ~3 semanas  

---

## 9. Ações Baseadas nas Métricas
- **Imediata:** Iniciar planejamento de escala de infraestrutura (ver Canvas de Escalabilidade)  
- **Contínua:** Revisar e corrigir as 4% de interações com erro (atualizar pipeline de pré-processamento e monitorar logs)

---

## 10. Relatórios e Compartilhamento
- **Dashboard Datadog** disponível para Produto e DevOps  
- **Relatório Mensal de KPIs** enviado à diretoria e corretores parceiros  
