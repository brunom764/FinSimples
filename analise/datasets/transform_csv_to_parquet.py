import pandas as pd

# Lê o CSV
df = pd.read_csv('C:/Users/Colaborador/Documents/repos/gerais/FinSimples/analise/datasets/cotacoes_resumidas_2022.csv')
# Salva como Parquet com compressão Snappy (padrão e eficiente)
df.to_parquet('cotacoes_b3_2022.parquet', index=False, compression='snappy')
