# Instruções de Build para o FinSimples

## 🚀 Configuração Inicial
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/finsimples.git
   cd finsimples ```

## 🚀 Crie e ative o ambiente virtual:

```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate    # Windows
```

## 🚀Instale as dependências:

```bash
pip install -r requirements.txt
```

## 🏗 Estrutura do Projeto

finsimples/
├── data/           # Dados históricos
├── docs/           # Documentação
├── src/
│   ├── main.py     # Aplicação principal
│   ├── analysis.py # Lógica de análise
│   └── utils.py    # Funções auxiliares
└── tests/          # Testes básicos


## ▶ Executando o Projeto
```bash
streamlit run src/main.py
```