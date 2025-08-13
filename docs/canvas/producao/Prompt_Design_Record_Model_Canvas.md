# Registro de Design de Prompt: PREVISAO-GRAFICO-TEXTO-01

---

## 1. Metadados
- **Propósito:** Após rodar o modelo de ML para prever a variação de um ativo em um período escolhido, gerar um texto descritivo que contextualize a previsão para o usuário, incluindo:
  - Interpretação dos números previstos.
  - Contexto histórico do ativo.
  - Informações sobre a empresa e o setor econômico.
- **Modelo(s) Alvo:** ChatGPT (gpt-4.1), otimizado para explicações financeiras.
- **Versão do Registro:** 1.1

---

## 2. Estrutura do Prompt
- **Contexto de Entrada Necessário:**  
  1. `cod_ativo` (string) — ticker escolhido pelo usuário.  
  2. `periodo` (string) — intervalo de datas previsto (ex: “5 anos”).  
  3. `preco_inicial` (float) — preço de fechamento no início do período.  
  4. `preco_previsto` (float) — preço previsto pelo modelo no final do período.  
  5. `serie_historica` (estatísticas): retorno médio anualizado, maior alta, maior baixa, volatilidade.  
  6. `info_empresa` (texto breve) — descrição da empresa obtida via ChatGPT.  
  7. `info_setor` (texto breve) — panorama do setor obtido via ChatGPT.

- **Template do Prompt (com variáveis):**  
  > “Você é um **analista financeiro experiente**. O usuário solicitou previsão para o ativo `{cod_ativo}` no período `{periodo}`. Nosso modelo de ML retornou:  
  > - Preço inicial: R$ {preco_inicial:.2f}  
  > - Preço previsto: R$ {preco_previsto:.2f}  
  > Histórico: retorno médio anualizado {retorno_medio}%, maior alta R$ {maior_alta}, maior baixa R$ {maior_baixa}, volatilidade {volatilidade}%.  
  > Contexto adicional: {info_empresa} | {info_setor}  
  > Resuma em **um parágrafo** (máx. 150 palavras) o que esses números significam para um investidor:  
  > 1. Contextualize o desempenho histórico breve.  
  > 2. Relacione o cenário atual da empresa e do setor.  
  > 3. Destaque riscos e oportunidades associados ao ativo.  
  > 4. Use linguagem clara e evite recomendações de compra ou venda.”

---

## 3. Estrutura da Resposta
- **Intenção da Resposta:**  
  Um único parágrafo em português voltado a investidores, que:
  - Interpreta a variação prevista.
  - Conecta ao histórico do ativo.
  - Acrescenta contexto de empresa e setor.
  - Aponta brevemente riscos e fatores que podem influenciar o retorno.
- **Exemplo de Saída Ideal:**  
  > “O ativo PETR4, que iniciou em R$ 30,00 em jan/2025, está previsto para fechar em R$ 31,80 em jul/2026 (valorização de 6,00%). Historicamente, nos últimos 5 anos, apresentou retorno médio anualizado de 8%, com alta máxima de R$ 35 em mar/2023 e baixa de R$ 25 em fev/2022, volatilidade moderada. A Petrobras atua no setor de energia e exploração de petróleo, com relevância global, enquanto o setor enfrenta ajustes devido à transição energética e variações no preço do barril. O desempenho pode ser impactado por políticas da OPEP, câmbio e cenário macroeconômico. Este panorama auxilia o investidor a compreender o contexto sem sugerir diretamente compra ou venda.”

---

## 4. Teste e Qualidade
- **Critérios de Aceite:**  
  1. ≤ 150 palavras.  
  2. Valores numéricos corretos e formatados (duas casas decimais).  
  3. Mencionar variação prevista, histórico e pelo menos um fator de empresa e setor.  
  4. Neutralidade: sem verbos de recomendação (“compre”, “venda”).  
- **Parâmetros Recomendados (API):**  
  - `temperature`: 0.3  
  - `max_tokens`: 220  
  - `frequency_penalty`: 0.0  
  - `presence_penalty`: 0.0

---

## 5. Notas Adicionais
- O **gráfico** é gerado separadamente pelo front-end (plot da série histórica + linha de previsão).  
- As informações de **empresa** e **setor** devem ser buscadas dinamicamente via ChatGPT antes da execução do prompt principal.  
- Em períodos muito curtos (<1 mês), enfatizar volatilidade de curtíssimo prazo.  
- Testar com ativos de baixa liquidez para garantir clareza mesmo com dados esparsos.
