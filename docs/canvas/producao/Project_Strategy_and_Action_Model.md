# Canvas de Estratégia e Ação do Projeto — FinSimples

_Este canvas sintetiza as metas estratégicas, indicadores e ações necessárias para entregar e escalar o FinSimples._

---

## 1. Objetivo Estratégico Geral
- Prover previsões instantâneas e confiáveis de retorno percentual de ativos da B3, reduzindo o tempo de decisão de investimento e aumentando a confiança dos usuários.

---

## 2. Objetivos Estratégicos Secundários
- Reduzir o tempo médio de decisão de investimento em 50%.  
- Aumentar a taxa de adoção da funcionalidade de previsão para ≥ 70% dos usuários piloto em 4 semanas.  
- Melhorar a precisão das projeções (R² ≥ 0.15) para ativos de baixa liquidez.

---

## 3. Resultados‑Chave Esperados (Quantitativos)
- Diminuir o tempo médio de decisão de 5 minutos para ≤ 2 minutos em 6 semanas.  
- Atingir 70% de adoção da API de previsão entre os usuários piloto em 1 mês.  
- Reduzir o erro médio (MSE) das previsões em 20% após otimizações de features em 3 meses.

---

## 4. Indicadores‑Chave de Sucesso (KPIs)
- **Tempo médio de decisão** (segundos)  
- **Taxa de adoção da previsão** (% de usuários que usam a feature)  
- **Precisão do modelo** (MSE e R² em validação hold‑out)  
- **CSAT** (avaliação de satisfação dos usuários)

---

## 5. Requisitos Estratégicos e Restrições
- **Conformidade LGPD**: Inputs de usuário anonimizados e logs expurgados após 7 dias.  
- **Orçamento**: USD 500/mês para infraestrutura em nuvem (API + S3).  
- **Compatibilidade**: Integração com plataformas de corretoras via API REST padrão JSON.

---

## 6. Priorização de Objetivos
- **Alta prioridade:** Reduzir tempo médio de decisão.  
- **Média prioridade:** Aumentar precisão das projeções para ativos de baixa liquidez.  
- **Baixa prioridade:** Expandir comparações multi‑ativo e multi‑horizonte.

---

## 7. Ações e Recursos Necessários
| Ação                                                       | Recursos Necessários                             |
|------------------------------------------------------------|--------------------------------------------------|
| Desenvolver pipeline ML (load → features → treino → deploy)| Cientista de Dados, ML Engineer                  |
| Implementar API de Previsão e Feature Flags                | Backend Developer (FastAPI), DevOps              |
| Criar interface simples de input/output (web/mobile)       | Frontend Developer (Next.js, Tailwind CSS)       |
| Agendar retraining automático e monitoramento              | DevOps (Airflow/Cron, Grafana, Sentry)           |
| Conduzir testes pilotos e coletar feedback (grupo restrito)| Product Manager, UX Researcher                   |

**Orçamento estimado:**  
- Infraestrutura (API + Storage): USD 500/mês  
- Horas de desenvolvimento: 160 h (equivalente a 1 engenheiro por mês)  

---

**Periodicidade de Revisão:** Revisar metas e ações a cada sprint (2 semanas) para ajustar prioridades e entregar valor incremental.  
