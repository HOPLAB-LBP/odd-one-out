#!/usr/bin/env python
# -*-coding:utf-8 -*-
'''
Created on	05/27 23:42:18 2024

@Author  :   Tom van Hogen 
'''

import os
import pandas as pd

# Define the folder path
folder_path = 'data'

# List all files in the folder
files = [f for f in os.listdir(folder_path) if f.endswith('.csv')]

# Loop through each file
for file in files:
    # Construct the full file path
    file_path = os.path.join(folder_path, file)
    
    # Read the CSV file
    df = pd.read_csv(file_path)
    
    # Keep only the first 15 columns
    df_cleaned = df.iloc[:, :15]
    
    # Construct the new filename with the suffix '_cleaned'
    new_filename = file.replace('.csv', '_cleaned.csv')
    new_folder_path = os.path.join(folder_path, "cleaned")
    new_file_path = os.path.join(new_folder_path, new_filename)
    # Create cleaned folder if not already created
    if not os.path.exists(os.path.join(new_folder_path)):
        os.mkdir(new_folder_path)
    
    # Save the cleaned dataframe to a new CSV file
    df_cleaned.to_csv(new_file_path, index=False)

print("Files processed, renamed, and saved in: ", new_folder_path)

