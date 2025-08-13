# Checklist de Lançamento — FinSimples

---

## 1. Objetivo e Escopo do Lançamento
- **Objetivo:** Lançar o MVP do FinSimples em modo piloto para validar usabilidade, performance e confiabilidade das projeções de retorno em produção.  
- **Escopo:** Disponibilizar a funcionalidade de previsão instantânea para **2 investidores selecionados** (1 experiente, 1 iniciante), usando feature flag.

---

## 2. Estratégia de Lançamento
- **Abordagem:** Canary Release controlado por Feature Flag.  
- **Justificativa:** Permite monitorar métricas de erro e coletar feedback de um grupo restrito antes de escalar para toda a base de usuários.

---

## 3. Plano de Comunicação
### Comunicação Interna
- E-mail para equipes de Produto, Suporte e DevOps anunciando o início do piloto.  
- Webinar de 1 hora com equipe de Suporte para demonstração e Q&A.  

### Comunicação Externa
- Notificação in-app e e-mail para investidores piloto.  
- Envio de guia rápido de uso e FAQs no portal da corretora.

---

## 4. Plano de Contingência e Rollback
**Gatilhos de Rollback:**  
- Taxa de erro da API > 5% por 30 min consecutivos.  
- ≥ 50% de feedback negativo (CSAT ≤ 5) no grupo piloto.  

**Ação de Rollback:**  
1. Desativar feature flag via painel admin.  
2. Reverter para a interface anterior.  
3. Notificar equipe de DevOps e enviar comunicado de status.  

**Tempo estimado de rollback:** ≤ 5 min.

---

## 5. Critérios de “Go/No-Go”
- [X] Todos os cenários críticos do **Canvas de Testes e Validação** aprovados.  
- [X] Pipeline de CI/CD com deploy e rollback testados em homologação.  
- [X] Equipes de Suporte e DevOps em plantão no dia do piloto.  
- **Decisão Final:** **GO** / [ ] NO-GO
