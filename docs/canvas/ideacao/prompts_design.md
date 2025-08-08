# Canvas de Design de Prompts - FinSimples

## 1. Prompt Inicial
**"Vamos analisar seu investimento! Digite o código do ativo (ex: PETR4) e por quantos anos deseja projetar (1-5):"**

## 2. Respostas Esperadas

### Formatos válidos:
- "[Código] [Anos]" → "PETR4 3"
- "[Código], [Anos]" → "VALE3, 2"
- Perguntas simples → "O que é um ativo?" (aciona ajuda)

### Respostas inválidas:
- Códigos inexistentes → "ABCD12"
- Períodos fora do range → "ITUB4 10"
- Formato incorreto → "3 anos em petrobras"

## 3. Ações Esperadas

### Para respostas válidas:
1. Confirmar entrada → "Analisando PETR4 para 3 anos..."
2. Mostrar card com:
   - 📈 Retorno projetado: X%
   - ⚠️ Principais riscos (3 bullets)
   - 📅 Período analisado: 20XX-20XX

### Para respostas inválidas:
1. Guiar correção → "Formato esperado: Código + Período (1-5 anos). Ex: PETR4 3"
2. Oferecer exemplo interativo → "Quer tentar com ITUB4? Digite 'ITUB4 2'"

### Fluxo complementar:
- "❓ Entenda como calculamos" → Explica metodologia em 2 frases
- "🔄 Analisar outro ativo" → Reinicia o fluxo

## 4. Feedback e Ajustes

### Coleta de feedback:
1. Avaliação simples pós-interação:
   "Esta análise foi útil? 👍/👎"
   
2. Comentário opcional:
   "O que poderíamos melhorar? (opcional)"

### Métricas de ajuste:
- Taxa de conclusão (entrada → projeção)
- Número de reformulações necessárias
- Avaliações positivas/negativas

### Estratégias de melhoria:
1. Otimizar mensagens de erro com base em falhas frequentes
2. Simplificar linguagem conforme feedback dos usuários
3. Adicionar exemplos para formatos com maior taxa de erro

## 5. Exemplo de Fluxo Completo

**Usuário:** "petrobras 2 anos"  
**Sistema:**  
1. "Analisando PETR4 para 2 anos..."  
2. Mostra card:  
   - Retorno: 15% (variação esperada 10-20%)  
   - Riscos:  
     • Volatilidade do preço do petróleo  
     • Dividendos abaixo da média  
     • Exposição cambial  
3. "❓ Entenda os cálculos | 🔄 Novo ativo"  

**Feedback:** "👍" (registrado para métricas)