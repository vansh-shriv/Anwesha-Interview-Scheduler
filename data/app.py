import pandas as pd

file = 'https://docs.google.com/spreadsheets/d/1HAfw-HpLzHu4Ofpw9Vo_hVFI0FOIc-LALmV3Y_pdKqY/export?format=csv'
df = pd.read_csv(file)
expected_columns = ['name', 'rollNumber', 'committeeName', 'date', 'time']
df = df[expected_columns]
df.to_csv('interviews.xlsx', index=False)