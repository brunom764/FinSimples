# Canvas de Planejamento de Escalabilidade — FinSimples

_(Este canvas responde à necessidade de suportar o lançamento pleno do FinSimples em produção)_

---

## 1. Objetivo da Escalabilidade
Preparar a infraestrutura do FinSimples para suportar o lançamento para toda a base de usuários (de 2 investidores piloto para 50 investidores ativos), mantendo o tempo médio de resposta da API de previsão abaixo de 3 segundos.

---

## 2. Volume Esperado de Interações
- **Cenário Atual (Piloto):** ~50 previsões/dia (2 usuários)  
- **Cenário Escalado (Produção):** ~500 previsões/dia (50 usuários), com picos de até 100 previsões/hora

---

## 3. Requisitos de Infraestrutura
- **Serviço de ML:**  
  - Adicionar 2 instâncias adicionais do contêiner do “Serviço de ML”  
  - Configurar Load Balancer (NGINX ou AWS ALB)  
- **API REST:**  
  - Escalonar o deployment FastAPI para 3 réplicas  
- **Cache:**  
  - Instância Redis para cache de previsões de tickers populares  
- **Storage:**  
  - Habilitar Auto-Scaling no bucket S3 (Parquet)  
- **LLM/ChatGPT:**  
  - Ajustar quota de requisições na OpenAI/GCP para gerar textos descritivos

---

## 4. Estratégias de Escalabilidade
- **Horizontal:**  
  - Replica-set de contêineres ML/API via Kubernetes ou ECS  
- **Cache:**  
  - Redis para armazenar resultados recentes e reduzir latência  
- **Pré-computação:**  
  - Agendar retraining incremental e manter modelos prontos para deploy sem latência de carga  
- **Fallback:**  
  - Servir respostas de fallback estáticas (cache “read-only”) se a latência da ML/API ultrapassar 3 s

---

## 5. Custo Estimado
| Recurso                   | Custo Mensal Estimado |
|---------------------------|-----------------------|
| Instâncias ML/API (3× VM) | R$ 800                |
| Redis (Cache)             | R$ 200                |
| API OpenAI/GCP            | R$ 1 200              |
| Storage S3 e Rede         | R$ 300                |
| **Total**                 | **R$ 2 500**          |

---

## 6. Riscos e Mitigação
- **Risco:** Exceder limite de requisições da API LLM  
  - **Mitigação:** Rate limiting + retries com backoff exponencial  
- **Risco:** Sobrecarga de CPU nas instâncias ML/API  
  - **Mitigação:** Autoscaling configurado via métricas de CPU > 70%  
- **Risco:** Cache stale  
  - **Mitigação:** TTL de 5 minutos e invalidation em deploy de novos modelos

---

## 7. Monitoramento de Escalabilidade
- Dashboards em Grafana/Datadog para:  
  - Uso de CPU das instâncias ML/API (> 80%)  
  - Latência média de resposta (> 3 s)  
  - Taxa de erros (> 1%)

---

## 8. Plano de Teste em Ambiente Escalado
- **Ferramenta:** k6 ou Locust  
- **Cenário de Teste:** Simular 100 requisições/hora (rampa de 0→100 em 10 min), por 1 hora  
- **Validação:**  
  - 95% das respostas ≤ 3 s  
  - Load Balancer distribui tráfego uniformemente  
  - Cache apresenta hit rate ≥ 60%
