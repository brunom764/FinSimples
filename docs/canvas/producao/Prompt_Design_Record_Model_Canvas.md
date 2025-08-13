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
"
  Você é um analista financeiro cético e conservador, escrevendo para investidores iniciantes.
    A ação em análise é a {ticker}.

    DADOS DISPONÍVEIS:
    1.  Previsão de Retorno Anual (modelo quantitativo): {predicted_return:.2%}
    2.  Indicadores Financeiros Atuais:
        {indicators_text}

    Sua resposta DEVE ser um objeto JSON válido com duas chaves: "analysis" e "five_year_return_percentage".

    1.  Para a chave "analysis", crie um texto em português formatado exatamente assim:
        ### Análise da Ação: {ticker} - <nome da empresa>
        **Contexto sobre a empresa**
        [Descreva em 2-3 frases características da empresa, como seu setor de atuação e o tempo de atividade no mercado]
        **Explicação do Resultado:**
        [Explique em 3-4 frases como os indicadores e a previsão se conectam.]
        **Prós de Investir:**
        - [Ponto positivo 1]
        - [Ponto positivo 2]
        **Contras de Investir:**
        - [Ponto negativo 1]
        - [Ponto negativo 2]

    2.  Para a chave "five_year_return_percentage", calcule uma projeção de retorno total para {year} anos.
        Assuma o papel de um analista financeiro conservador.

        **Objetivo:** Calcular a projeção de retorno total de uma ação em {year} anos, de forma realista e fundamentada.

        **Dados de Entrada:**
        * **Retorno Projetado (1 ano):** {predicted_return:.2%}

        **Instruções de Cálculo:**
        1.  Comece com o retorno projetado para 1 ano, mas **não o extrapole matematicamente** para {year} anos (Ex: não faça `retorno_1_ano * {year}`).
        2.  Avalie a tendência de longo prazo do setor da empresa usando a tabela abaixo.
        3.  Aplique um **fator de ajuste qualitativo** baseado na tendência do setor e em uma visão conservadora do mercado brasileiro. Ações com retornos anuais muito altos devem ser ajustadas para baixo, refletindo a dificuldade de manter tal performance. Ações com rentabilidade negativa não significam necessariamente rentabilidades negativas ao longo prazo. Tudo depende do setor.
        4.  Com base nesta análise, estabeleça uma projeção de **retorno total acumulado** para os {year} anos.

        **Tabela de Referência Setorial:**
        * "Financeiro": "Estável com crescimento moderado"
        * "Consumo": "Ligado à renda e confiança do consumidor"
        * "Industrial": "Cíclico e dependente de investimentos"
        * "Agropecuária": "Forte crescimento e vocação exportadora"
        * "Saúde": "Crescimento sólido e defensivo"
        * "Varejo": "Altamente competitivo e em transformação"
        * "Energia": "Estável com forte viés de transição"
        * "Tecnologia": "Alto crescimento e inovação constante"
        * "Saneamento": "Estável com enorme potencial de crescimento"
        * "Siderurgia/Metalurgia/Mineração": "Altamente cíclico e ligado a commodities"
        * "Construção Civil/Imobiliário": "Altamente cíclico e sensível aos juros"
        * "Papel e Celulose": "Forte vocação exportadora e competitiva"
        * *(outros setores da sua lista)*

        **Formato da Resposta:**
        * Retorne **apenas o número final** da projeção de retorno total em {year} anos, como um valor de ponto flutuante (float).
        * **Exemplo:** Se a projeção for de 45.8%, retorne `45.8`."

---

## 3. Estrutura da Resposta
- **Intenção da Resposta:**  
  Um único parágrafo em português voltado a investidores, que:
  - Interpreta a variação prevista.
  - Conecta ao histórico do ativo.
  - Acrescenta contexto de empresa e setor.
  - Aponta brevemente riscos e fatores que podem influenciar o retorno.
- **Exemplo de Saída Ideal:**  
  > ### Análise da Ação: PETR4 - Petrobras\n**Contexto sobre a empresa**\nA Petrobras é a maior empresa de petróleo e gás do Brasil, atuando no setor de energia há mais de 60 anos. Ela é responsável por grande parte da produção, refino e distribuição de combustíveis fósseis no país, sendo uma das líderes do setor na América Latina.\n**Explicação do Resultado:**\nO indicador P/L em torno de 8,6 sugere que a ação está sendo negociada a múltiplos razoáveis em relação ao seu lucro, o que pode indicar uma certa atratividade de preço. A previsão de retorno anual de 15,86% é elevada, mas é importante destacar que o setor de energia, especialmente petróleo, é exposto a volatilidade de preços internacionais e riscos políticos no Brasil. Como analista conservador, considero difícil manter retornos tão altos de forma sustentável, especialmente em um setor tradicionalmente estável, mas sujeito a ciclos econômicos e mudanças regulatórias. Portanto, a projeção deve ser ajustada para refletir um cenário mais realista ao longo de cinco anos.\n**Prós de Investir:**\n- Forte presença de mercado e liderança no setor de energia.\n- Potencial de bons dividendos devido à lucratividade da empresa.\n**Contras de Investir:**\n- Alta exposição a riscos regulatórios e políticos no Brasil.\n- Forte dependência de preços internacionais do petróleo, que são voláteis.

  long_term_outlook = 55.0

---

## 4. Teste e Qualidade
- **Critérios de Aceite:**  
  1. ≤ 150 palavras.  
  2. Valores numéricos corretos e formatados (duas casas decimais).  
  3. Mencionar variação prevista, histórico e pelo menos um fator de empresa e setor.  
  4. Neutralidade: sem verbos de recomendação (“compre”, “venda”).  
- **Parâmetros Recomendados (API):**  
  - `temperature`: 0.5  
  - `frequency_penalty`: 0.0  
  - `presence_penalty`: 0.0

---

## 5. Notas Adicionais
- O **gráfico** é gerado separadamente pelo front-end (plot da série histórica + linha de previsão).  
- As informações de **empresa** e **setor** devem ser buscadas dinamicamente via ChatGPT antes da execução do prompt principal.  
- Em períodos muito curtos (<1 mês), enfatizar volatilidade de curtíssimo prazo.  
- Testar com ativos de baixa liquidez para garantir clareza mesmo com dados esparsos.
