# Canvas de Desenho de Experimento — FinSimples

**Este canvas foca na validação rápida de hipóteses usando um MVP de “Wizard of Oz” para o assistente de projeção de retorno.**

---

## 1. Ideia a Ser Validada
Utilizar o FinSimples para fornecer, em um clique, projeções de retorno percentual do dia seguinte, acelerando a decisão de investimento dos usuários.

---

## 2. Hipótese Principal
Acreditamos que **ao oferecer projeções instantâneas de retorno via FinSimples**, o **tempo médio de decisão do investidor cairá em pelo menos 50%** em comparação ao uso de ferramentas tradicionais de consulta (planilhas, relatórios manuais).

---

## 3. Desenho do Experimento (MVP)
- **Wizard of Oz**: simulamos o backend de ML com um operador humano que, ao receber “TICKER + PERÍODO” no chat, busca manualmente a projeção pré‑calculada em planilha histórica e retorna ao usuário.  
- **Fluxo**:
  1. Usuário digita “PETR4 3” na interface web.  
  2. Operador humano consulta tabela histórica e calcula retorno médio de 3 anos atrás até hoje.  
  3. Envia card com “Retorno projetado: X%, Riscos: […]”.  
- Objetivo: validar UX, velocidade do fluxo e aceitação sem ainda treinar modelo de IA.

---

## 4. Métricas‑Chave de Aprendizagem
- **Tempo médio até exibição do card** (meta MVP ≤ 30 s).  
- **Tempo médio de decisão** (tempo entre card exibido e clique em “Comprar/Não comprar”).  
- **Taxa de sucesso**: % de usuários que completam decisão sem solicitar “ajuda humana”.  
- **Satisfação do usuário** (NPS rápido ou escala 1–5 ao final da interação).

---

## 5. Critérios de Sucesso (Pivotar ou Perseverar)
- **Perseverar** se:
  - Tempo médio de decisão ≤ 50% do fluxo tradicional (ex: de 10 min para ≤ 5 min).  
  - Satisfação média ≥ 4/5.  
  - ≥ 70% dos usuários completam a decisão sem intervenção manual adicional.  
- **Pivotar** se:
  - Redução de tempo < 40%.  
  - Satisfação < 3,5/5.  
  - > 30% dos usuários solicitam “explicações adicionais” ou “ajuda humana”.  
