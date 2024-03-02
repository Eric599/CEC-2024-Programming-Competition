import pandas as pd
import numpy as np
import os
from pathlib import Path

import os

# Specify the directory you want to start from
root_directory = 'data/'
resource_data = {}
grid_size = 100

for root, dirs, files in os.walk(root_directory):
    print(f"Currently looking in: {root}")
    for dirname in dirs:
        print(f"Directory: {root}")
        # os.chdir(dirname)
        
        days_data = []
    for i, filename in files:
        name = filename.split('_', 1)[0]
        print(f"File: {filename}")
        day_data = pd.read_csv(root + "/" + filename).values
        # days_data.append(days_data)
        # Initialize an empty 2D array (grid) with NaN or zeros
        grid = np.full((grid_size, grid_size), np.nan)
    
        grid[day_data[2], day_data[1]] = day_data[3]  # Assuming x and y are 0-indexed
        
        print("DATA: " + name)
        # print(day_data[0])
        resource_data[name] = [i][grid]

# Function to load the data for a single resource across all 30 days
# def load_resource_data(resource_name, data_directory, num_days=30):
#     days_data = []
#     for day in range(1, num_days + 1):
#         filename = f"{data_directory}{resource_name}_Day{day}.csv"
#         day_data = pd.read_csv(filename, header=None).values
#         days_data.append(day_data)
#     return days_data

# # Initialize the dictionary to store the data
# resource_data = {}

# # Load the data for each resource
# for resource_name in resource_names:
#     resource_data[resource_name] = load_resource_data(resource_name, data_directory)

# At this point, resource_data is a dictionary where keys are resource names
# and values are arrays of 30 elements, each element being a 100x100 grid (numpy array) of float values
