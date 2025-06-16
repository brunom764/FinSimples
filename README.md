# 📈 FinSimples - IA Generativa para Investimentos

**Simplificando o mercado financeiro através de inteligência artificial generativa**

[![Python Version](https://img.shields.io/badge/python-3.8%2B-blue)](https://www.python.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: Desenvolvimento](https://img.shields.io/badge/Status-Desenvolvimento%20Ativo-brightgreen)]()

## 🚀 Visão Geral

O FinSimples é uma ferramenta que utiliza IA generativa para democratizar o acesso a informações do mercado financeiro. Através de uma interface simples, usuários podem obter projeções de retorno para diversos ativos com base em seu histórico, explicadas em linguagem acessível.

## ✨ Funcionalidades Principais

- 🔍 Busca simplificada de ativos (ações, ETFs, fundos)
- ⏳ Projeções de retorno para diferentes horizontes de tempo
- 📊 Visualizações intuitivas do histórico e tendências
- 💡 Explicações em linguagem natural geradas por IA
- ⚠️ Alertas sobre riscos e volatilidade

## 📥 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/brunom764/finsimples.git
cd finsimples
```

2. Crie e ative um ambiente virtual (recomendado):
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
```

3. Instale as dependências:
```bash
pip install -r requirements.txt
```

4. Configure suas chaves de API (renomeie `.env.example` para `.env` e preencha com suas credenciais)

## 🛠️ Como Usar

```python
from finsimples import Analisador

analisador = Analisador()
resultado = analisador.analisar("PETR4", anos=5)

print(resultado['projecao'])
print(resultado['explicacao'])
```

Exemplo de output:
```
📊 Projeção para PETR4 em 5 anos:
Retorno esperado: 42% (8.4% ao ano)
Volatilidade estimada: Alta

💡 Explicação:
Baseado no histórico dos últimos 10 anos, a Petrobras tem mostrado...
```

## 📚 Documentação

Para documentação completa, incluindo API reference e guias avançados, visite nossa [Wiki](https://github.com/brunom764/FinSimples/blob/main/README.md).

## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie sua branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

Siga nossas [diretrizes de contribuição](https://github.com/brunom764/FinSimples/blob/main/CONTRIBUTING.md).

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](https://github.com/brunom764/FinSimples/blob/main/LICENSE.md) para detalhes.

## 👏 Créditos

- Equipe: Bruno Miguel Moreira Albuquerque, Geydson Renan e Diogo Nogueira

## 🖼️ Screenshots

~ em breve ~

## ❓ FAQ

**Q: As projeções são garantidas?**  
A: Não. Todas as projeções são baseadas em dados históricos e não constituem garantia de retorno futuro.

**Q: Posso usar isso como única fonte para investir?**  
A: Recomendamos usar como ferramenta educacional e sempre diversificar investimentos.

## 📌 Estado do Projeto

⚠️ **Beta** - Em desenvolvimento ativo. Novas funcionalidades sendo adicionadas semanalmente.

