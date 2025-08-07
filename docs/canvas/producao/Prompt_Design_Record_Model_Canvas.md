# Registro de Design de Prompt: PREVISAO‑GRAFICO‑TEXTO‑01

## 1. Metadados
- **Propósito:** Após rodar o modelo de ML para prever a variação de um ativo em um período escolhido, gerar um texto descritivo que contextualize essa previsão para o usuário.  
- **Modelo(s) Alvo:** ChatGPT (gpt-4 ou similar), otimizado para explicações financeiras.  
- **Versão do Registro:** 1.0

---

## 2. Estrutura do Prompt
- **Contexto de Entrada Necessário:**  
  1. `cod_ativo` (string) — ticker escolhido pelo usuário.  
  2. `periodo` (string) — intervalo de datas previsto (ex: “01/2025–07/2025”).  
  3. `preco_inicial` (float) — preço de fechamento no início do período.  
  4. `preco_previsto` (float) — preço previsto pelo modelo no final do período.  
  5. `serie_historica` (estatísticas): retorno médio anualizado, maior alta, maior baixa, volatilidade.  

- **Template do Prompt (com variáveis):**  
  > “Você é um **analista financeiro experiente**. O usuário solicitou previsão para o ativo `{cod_ativo}` no período `{periodo}`. Nosso modelo de ML retornou:  
  > - Preço inicial: R$ {preco_inicial:.2f}  
  > - Preço previsto: R$ {preco_previsto:.2f}  
  > Resuma em **um parágrafo** (máx. 150 palavras) o que esses números significam para um investidor:  
  > 1. Contextualize o desempenho histórico breve (média, alta, baixa, volatilidade).  
  > 2. Destaque riscos e oportunidades associados ao ativo.  
  > 3. Use linguagem clara e evite recomendações de compra ou venda.”

---

## 3. Estrutura da Resposta
- **Intenção da Resposta:**  
  Um único parágrafo em português voltado a investidores, que:  
  - Interpreta a variação prevista.  
  - Conecta ao contexto histórico do ativo.  
  - Aponta brevemente riscos ou fatores que podem influenciar o retorno.  
- **Exemplo de Saída Ideal:**  
  > “O ativo PETR4, que iniciou em R$ 30,00 em jan/2025, está previsto para fechar em R$ 31,80 em jul/2026 (valorização de 6,00%). Historicamente, nos últimos 5 anos, ele teve retorno médio anualizado de 8%, com alta máxima de R$ 35 em mar/2023 e baixa de R$ 25 em fev/2022, apresentando volatilidade moderada. A previsão reflete expectativa de estabilidade nos preços internacionais do petróleo, mas pode ser impactada por oscilações cambiais e notícias de OPEP. Este panorama ajuda o investidor a entender o cenário sem sugerir diretamente compra ou venda.”

---

## 4. Teste e Qualidade
- **Critérios de Aceite:**  
  1. ≤ 150 palavras.  
  2. Valores numéricos corretos e formatados (duas casas decimais).  
  3. Mencionar variação prevista e ao menos um ponto de contexto histórico.  
  4. Neutralidade: sem verbos de recomendação (“compre”, “venda”).  
- **Parâmetros Recomendados (API):**  
  - `temperature`: 0.3  
  - `max_tokens`: 200  
  - `frequency_penalty`: 0.0  
  - `presence_penalty`: 0.0

---

## 5. Notas Adicionais
- O **gráfico** é gerado separadamente pelo front‑end (plot da série histórica + linha de previsão).  
- Em casos de períodos muito curtos (<1 mês), o resumo deve enfatizar volatilidade de curtíssimo prazo.  
- Testar prompts com tickers de baixa liquidez para garantir clareza mesmo com dados esparsos.
