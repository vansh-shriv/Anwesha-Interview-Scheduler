import pandas as pd

# Load the Excel file
excel_file = 'mock_interview_schedule.xlsx' 

# Read the Excel sheet (default first sheet)
df = pd.read_excel(excel_file)

# Ensure correct column order (optional but good practice)
expected_columns = ['name', 'rollNumber', 'committeeName', 'day', 'time']
df = df[expected_columns]

# Save to CSV
df.to_csv('output.csv', index=False)
df.to_csv('interviews.xlsx', index=False);
