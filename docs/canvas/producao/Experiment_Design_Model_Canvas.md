# Canvas de Desenho de Experimento — FinSimples

**Objetivo:** validar rapidamente hipóteses usando um MVP funcional com **modelo de Machine Learning** para projeção e **ChatGPT** para contexto setorial/empresarial e alertas ao usuário.

---

## 1. Ideia a Ser Validada
Utilizar o FinSimples para fornecer, em um clique, **projeções de retorno** para o período solicitado (1–5 anos), acompanhadas de **contexto sobre a empresa e o setor** (gerados via ChatGPT) e **alertas de atenção**, acelerando e qualificando a tomada de decisão do investidor.

---

## 2. Hipótese Principal
Acreditamos que **ao oferecer projeções + contexto/alertas gerados via ChatGPT**, o **tempo médio de decisão do investidor cairá em ≥ 50%** e a **satisfação** aumentará (≥ 4/5) em comparação ao uso de ferramentas tradicionais (planilhas/relatórios).

---

## 3. Desenho do Experimento (MVP)
- **Formato:** MVP funcional — backend processa requisições com **modelo de ML** (projeção) e **ChatGPT** (contexto/alertas).
- **Fluxo:**
  1. Usuário insere `TICKER + PERÍODO` na interface (ex.: `PETR4 3 + 4 anos`).
  2. **API de Previsão** (FastAPI) valida o input.
  3. **Modelo de ML** retorna a **projeção de retorno**.
  4. **ChatGPT (LLM)** gera a **narrativa**:
     - **Empresa:** breve perfil (ex.: segmento/atividade).
     - **Setor:** panorama sucinto (características gerais, volatilidade típica).
     - **Alertas:** pontos de atenção (volatilidade, liquidez, concentração setorial, correlação).
     - **Disclaimers:** linguagem clara, sem jargões e **sem call de compra/venda**.
  5. Backend compõe e retorna o **card** com projeção + contexto + alertas.
- **Observações:**
  - O LLM **não consulta notícias em tempo real** neste MVP; o objetivo é **explicar** e **contextualizar** de forma acessível.
  - Metas de latência serão monitoradas separadamente para **dados/ML** e **LLM**.

---

## 4. Métricas-Chave de Aprendizagem
- **Tempo até exibir o card (TTV)** — meta: ≤ 3 s.
- **Latência LLM** (ChatGPT) — meta: ≤ 1.8 s do total.
- **Tempo médio de decisão** — entre exibição do card e clique em “Comprar/Não comprar”.
- **Satisfação (clareza da linguagem)** — escala 1–5 (meta: ≥ 4/5).
- **Utilidade dos alertas** — % de usuários que declaram que os alertas ajudaram (meta: ≥ 70%).
- **Taxa de sucesso** — % que concluem decisão **sem** pedir ajuda adicional (meta: ≥ 70%).
- **Pedidos de esclarecimento** — % que solicitam explicações extras (queremos ≤ 30%).

---

## 5. Critérios de Sucesso (Pivotar ou Perseverar)
- **Perseverar** se:
  - Redução ≥ 50% no **tempo médio de decisão** (ex.: 10 min → ≤ 5 min).
  - **Satisfação média ≥ 4/5**.
  - **Utilidade dos alertas ≥ 70%**.
  - **Taxa de sucesso ≥ 70%** (sem intervenção adicional).
- **Pivotar** se:
  - Redução < 40% no tempo médio.
  - Satisfação < 4/5.
  - > 30% dos usuários solicitam explicações adicionais/ajuda manual.

---
