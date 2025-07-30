# Canvas de Entrega e Lançamento — FinSimples

## 1. Objetivo do Lançamento
**Disponibilizar o FinSimples em produção para investidores e plataformas parceiras, permitindo projeções instantâneas de retorno de ativos com alta confiabilidade e interface simples, acelerando a tomada de decisão em até 30 segundos e aumentando a adesão ao serviço.**

## 2. Escopo do Lançamento
- **Funcionalidades incluídas**  
  - Seleção de ativo (código B3) e período (1–5 anos)  
  - Geração de card com: retorno projetado, faixa de variação e principais riscos  
  - API REST de previsão (JSON)  
- **Integrações**  
  - Data Lake Parquet com séries históricas da B3  
  - Model Store (pipelines `.joblib` em S3)  
- **Restrições**  
  - Lançamento inicial limitado aos 5 ativos mais negociados  
  - Sem comparativos entre ativos ou recomendações personalizadas  
  - Sem visualizações gráficas avançadas nesta fase

## 3. Cronograma
| Fase             | Período                 | Atividades Principais                                          |
|------------------|-------------------------|----------------------------------------------------------------|
| **Fase 1**       | Semana 1                | Deploy em produção, configuração de infraestrutura e domínios |
| **Fase 2**       | Semana 2                | Testes de integração        |
| **Fase 3**       | Semana 3–4              | Monitoramento intensivo, coleta de feedback de usuários iniciais |
| **Fase 4**       | Semana 5                | Ajustes finais e rollout para toda a base de usuários          |

## 4. Estratégia de Lançamento
- **Abordagem**: Lançamento gradual (canary release)  
- **Justificativa**: Permite validar performance e estabilidade em um grupo restrito antes de escalar ao público geral, reduzindo risco de falhas em massa.

## 5. Comunicação Interna e Externa
- **Interna**  
  - Kickoff meeting com times de Engenharia, Suporte e Operações  
  - Documentação e runbook compartilhados no Confluence  
  - Canal dedicado no Slack para dúvidas e incidentes  
- **Externa**  
  - E-mail para investidores-cadastros destacando “one-click forecast”  
  - Banner no portal de parceiros e corretoras anunciando a novidade  
  - Vídeo tutorial de 1 minuto incorporado na página de previsão

## 6. Plano de Monitoramento Pós-Lançamento
- **Infraestrutura**: dashboards de métricas em Grafana (CPU, memória, latência)  
- **Aplicação**: alertas de erro >1% e tempo de resposta >2 s via Sentry  
- **Negócio**: relatórios semanais de uso (nº de previsões, ativos mais solicitados)  
- **Qualidade**: pesquisa rápida dentro do card (“foi útil? 👍/👎”) nas duas primeiras semanas

## 7. Planos de Contingência
| Risco                                   | Plano de Ação                                                                 |
|-----------------------------------------|-------------------------------------------------------------------------------|
| Queda de acurácia do modelo             | Reverter para pipeline anterior e disparar retraining automático               |
| Latência ou timeout da API              | Habilitar fallback para endpoint de cache com última previsão                 |
| Falha no Data Lake (dados históricos)   | Usar snapshot local e notificar equipe de dados para correção imediata        |
| Erros de infraestrutura (VM ou S3)      | Switch para instância standby e avisar DevOps para escalonamento              |

## 8. Recursos Necessários
- **Humanos**:  
  - 1 Engenheiro de ML  
  - 1 Backend Developer  
  - 1 DevOps/Infra  
  - 1 Analista de Suporte  
- **Técnicos**:  
  - VM (4 vCPU, 16 GB RAM) para API e ML  
  - Bucket S3 para dados Parquet e modelos  
  - Ferramentas de monitoramento (Grafana, Sentry)  
- **Financeiros**:  
  - Orçamento para servidores e tráfego S3 (~US$ 500/mês)  
  - Verba de marketing digital para anúncio inicial (US$ 1 000)

## 9. Métricas de Sucesso
- **Taxa de adoção** ≥ 70% dos usuários pilotos na 1ª semana  
- **Tempo médio de resposta** ≤ 2 segundos por requisição  
- **Satisfação do usuário** ≥ 85% de avaliações positivas (👍)  
- **Disponibilidade da API** ≥ 99,5% uptime

## 10. Feedback e Iterações
- **Coleta de feedback**  
  - Pop-up de avaliação pós‑previsão (👍/👎 + comentário)  
  - Formulário simples enviado por e-mail após 1 semana  
- **Processo de iteração**  
  - Revisão quinzenal dos feedbacks em sprint planning  
  - Priorização de ajustes no backlog (UX, performance, features)  
  - Deploy contínuo via pipelines CI/CD para validar melhorias

---

**Periodicidade:** Revisão do canvas a cada 2 semanas durante o lançamento  
**Ferramentas:** Trello ou Notion para tracking colaborativo do plano  
