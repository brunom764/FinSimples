import pandas as pd
import os

# Caminho onde estão os arquivos .parquet
pasta = 'C:/Users/Colaborador/Documents/repos/gerais/FinSimples/analise/datasets'  # <-- Substitua

# Lista para armazenar os DataFrames
dfs = []

# Lista apenas arquivos .parquet na pasta
arquivos = [arq for arq in os.listdir(pasta) if arq.endswith('.parquet')]

# Lê e adiciona cada parquet à lista
for arquivo in arquivos:
    caminho_arquivo = os.path.join(pasta, arquivo)
    df = pd.read_parquet(caminho_arquivo)
    dfs.append(df)

# Concatena todos os DataFrames
df_concatenado = pd.concat(dfs, ignore_index=True)

# Salva em um único arquivo Parquet
df_concatenado.to_parquet(os.path.join(pasta, 'cotacoes_concatenadas.parquet'),
                          index=False,
                          compression='snappy')

print("Concatenação concluída! Arquivo salvo como 'cotacoes_concatenadas.parquet'")
