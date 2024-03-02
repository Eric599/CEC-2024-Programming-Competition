import pandas as pd
import numpy as np

# Function to load the data for a single resource across all 30 days
def load_resource_data(resource_name, data_directory, num_days=30):
    days_data = []
    for day in range(1, num_days + 1):
        filename = f"{data_directory}{resource_name}_Day{day}.csv"
        day_data = pd.read_csv(filename, header=None).values
        days_data.append(day_data)
    return days_data

# Names of the resources - adjust these to match your actual resource names
resource_names = [f"Resource{i}" for i in range(1, 9)]

# Directory where the CSV files are stored, adjust it to your directory
data_directory = "path/to/your/data/"

# Initialize the dictionary to store the data
resource_data = {}

# Load the data for each resource
for resource_name in resource_names:
    resource_data[resource_name] = load_resource_data(resource_name, data_directory)

# At this point, resource_data is a dictionary where keys are resource names
# and values are arrays of 30 elements, each element being a 100x100 grid (numpy array) of float values
