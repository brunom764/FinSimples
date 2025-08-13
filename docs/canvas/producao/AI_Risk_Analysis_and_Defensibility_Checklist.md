# Checklist de Análise de Riscos e Defensabilidade — FinSimples  
**Projeto:** FinSimples — Assistente de Previsão de Retorno de Ativos  
**Data da Análise:** 28/07/2025  
**Versão do Produto Analisada:** v1.0-MVP  

---

#### 1. Análise de Justiça e Viés (Fairness & Bias)
- **Risco 1:** **Viés de cobertura** para ativos de alta liquidez.  
  - Usuários podem receber previsões mais precisas para tickers muito negociados (ex: PETR4) e menos confiáveis para papéis de menor volume.  
- **Risco 2:** **Reforço de tendências históricas**, favorecendo setores já em alta e penalizando setores emergentes com menos dados históricos.  

#### 2. Análise de Privacidade e Dados
- **Risco 1 (Crítico):** **Exposição de padrões de operação**.  
  - Logs de uso contendo sequência de tickers e períodos podem revelar estratégias de investimento dos usuários.  
- **Risco 2:** **Não conformidade com LGPD**.  
  - Armazenar inputs do usuário (código + período) sem expurgo pode violar regras de retenção de dados pessoais.  

#### 3. Análise de Segurança e Robustez
- **Risco 1 (Crítico):** **Injection de input malicioso**.  
  - Tickers ou parâmetros contendo caracteres especiais podem quebrar queries internas ou executar código indesejado.  
- **Risco 2:** **Alucinação de modelo**.  
  - Sistema pode gerar retornos ou riscos imaginários (ex: “Retorno de 50%”) sem embasamento histórico.  

#### 4. Análise de Transparência e Explicabilidade
- **Risco 1:** **Opacidade na confiabilidade**.  
  - Usuário não sabe intervalo de confiança ou fonte dos dados, gerando baixa confiança na previsão.  
- **Risco 2:** **Excesso de confiança**.  
  - Ausência de disclaimers explícitos leva investidores a assumirem previsões como certezas absolutas.  

#### 5. Matriz de Priorização de Riscos

| Impacto ↓ \ Probabilidade → | Baixa               | Média                               | Alta                                            |
|-----------------------------|---------------------|-------------------------------------|-------------------------------------------------|
| **Alto**                    | Viés de Tendência   | Vazamento de Padrões de Uso (PII)   | Injection de Input / Alucinação do Modelo       |
| **Médio**                   | Viés de Cobertura   | Excesso de Confiança do Usuário     | Não conformidade com LGPD                       |
| **Baixo**                   | Opacidade Menor     |                                     |                                                 |

#### 6. Plano de Mitigação
- **High Priority: Injection de Input / Alucinação do Modelo**  
  - **Ação:**  
    1. Validar e sanitizar todos os parâmetros de ticker/período via regex estrita.  
    2. Implementar limites de retorno plausíveis (ex: ±20% máximo permitido).  
  - **Responsáveis:** Eng. de Backend, Cientista de Dados.  
  - **Verificação:** Criar suíte de testes “Red Teaming” com 20 inputs maliciosos e garantir 100% de rejeição ou sanitização correta.

- **High Priority: Vazamento de Padrões de Uso (PII)**  
  - **Ação:**  
    1. Anonimizar logs mantendo apenas estatísticas de uso agregadas.  
    2. Implementar expurgo automático de inputs após 7 dias.  
  - **Responsáveis:** Eng. de Dados, DevOps.  
  - **Verificação:** Auditoria mensal nos logs para confirmar ausência de dados identificáveis de usuário.

- **Medium Priority: Não Conformidade com LGPD**  
  - **Ação:**  
    1. Revisar política de retenção de dados e ajustar TTL no banco de dados.  
    2. Adicionar consentimento explícito na interface antes de coletar inputs.  
  - **Responsáveis:** Jurídico, Eng. de Frontend.  
  - **Verificação:** Teste de fluxo de consentimento e validação em homologação.

- **Medium Priority: Excesso de Confiança / Opacidade na Confiabilidade**  
  - **Ação:**  
    1. Exibir disclaimer em cada card: “Projeções são estimativas com base em dados históricos e não garantem resultados.”  
    2. Mostrar intervalo de confiança (e.g. ±5%) e referência à fonte dos dados.  
  - **Responsáveis:** Designer de UX, Eng. de Frontend.  
  - **Verificação:** Testes de usabilidade e checagem visual em 100% dos cards.

---
