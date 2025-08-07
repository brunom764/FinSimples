import pandas as pd

# Caminho para o arquivo da B3 (fixo)
arquivo = 'COTAHIST_A2020.TXT'

# Tamanhos de campos para cada informação (começando do índice 0)
def parse_linha(linha):
    return {
        'data_pregao': linha[2:10],
        'cod_negociacao': linha[12:24].strip(),
        'nome_empresa': linha[27:39].strip(),
        'tipo_mercado': linha[41:49].strip(),
        'especificacao': linha[39:49].strip(),
        'preco_abertura': int(linha[56:69]) / 100.0,
        'preco_maximo': int(linha[69:82]) / 100.0,
        'preco_minimo': int(linha[82:95]) / 100.0,
        'preco_medio': int(linha[95:108]) / 100.0,
        'preco_fechamento': int(linha[108:121]) / 100.0,
        'volume': int(linha[174:188]) / 100.0,
        'qtd_negocios': int(linha[147:152]),
    }

# Lista para guardar os dados
dados = []

# Leitura do arquivo
with open(arquivo, 'r', encoding='latin1') as f:
    for linha in f:
        if linha.startswith('01'):
            dados.append(parse_linha(linha))

# Transformar em DataFrame
df = pd.DataFrame(dados)

# Converter a data para datetime
df['data_pregao'] = pd.to_datetime(df['data_pregao'], format='%Y%m%d')

# Salvar como CSV
df.to_csv('cotacoes_resumidas_2020.csv', index=False)

print('Arquivo CSV criado com sucesso!')
