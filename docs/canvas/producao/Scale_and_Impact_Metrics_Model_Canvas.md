# Canvas de Métricas de Escala e Impacto — FinSimples

_(Este canvas define como monitorar a performance técnica, o impacto de negócio e a satisfação dos usuários, além de acionar melhorias com base em dados)_

---

## 1. Objetivo do Monitoramento
Monitorar o efeito do FinSimples na agilidade e qualidade da decisão de investimento dos usuários piloto e garantir a estabilidade técnica da solução.

---

## 2. Métricas de Uso
- **Previsões diárias:** 50 (2 investidores piloto)  
- **Usuários ativos/semana:** 2 (100% do grupo piloto)  
- **Taxa de adoção:** 100% (grupo piloto não usa mais planilhas manuais)

---

## 3. Métricas de Desempenho
- **Tempo médio de resposta da API:** 1,8 s  
- **Taxa de erro da API (HTTP 5xx/falha de inferência):** 4%  
- **Latência do modelo (p95):** 1,2 s

---

## 4. Métricas de Impacto no Negócio
- **Tempo economizado por previsão:** ~10 min por investidor  
- **Redução do tempo de decisão:** 50% em média vs. método anterior  
- **Consistência de decisões:** 0% de discrepâncias em backtests

---

## 5. Métricas de Satisfação do Usuário
- **CSAT médio:** 9,2 / 10  
- **Feedback qualitativo:** “Ajuda a entender tendências sem montar planilhas complexas.”

---

## 6. Ferramentas de Monitoramento
- **Datadog:** latência, CPU e erros  
- **Sentry:** exceções e falhas de inferência  
- **Kibana/Elasticsearch:** análise de logs  
- **Entrevistas semanais:** feedback direto dos pilotos

---

## 7. Benchmarks
- **Tempo de resposta ideal:** ≤ 15 s  
- **Taxa de erro ideal:** < 5%

---

## 8. Acompanhamento de Tendências
- Relatórios semanais de uso e performance  
- Crescimento de ~20% nas previsões semanais = gatilho para escala em ~3 semanas

---

## 9. Ações Baseadas nas Métricas
- **Imediata:** Planejar escala de infraestrutura (ver Canvas de Escalabilidade)  
- **Contínua:** Corrigir as 4% de interações com erro (pipeline + monitoramento de logs)

---

## 10. Relatórios e Compartilhamento
- **Dashboard Datadog:** acesso para Produto e DevOps  
- **Relatório mensal de KPIs:** enviado à diretoria e parceiros

---

## 11. Integração com ChatGPT (Contexto e Alertas)
- **Objetivo:** Enriquecer análises com contexto do setor e empresa  
- **Uso:**  
  - Geração automática de insights setoriais a partir dos dados monitorados  
  - Identificação de anomalias com base em comparativos históricos  
  - Alertas proativos para equipe de Produto/DevOps quando métricas ultrapassarem limites
- **Configuração:**  
  - API OpenAI integrada ao pipeline de monitoramento  
  - Prompt inclui dados de métricas + breve descrição do FinSimples + resumo do mercado atual
