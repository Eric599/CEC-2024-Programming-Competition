import pandas as pd
import os
from app.extensions import cache

categories = [
    'algal', 'coral', 'helium', 'metal', 'oil', 'ship',
    'species', 'temperature', 'wind', 'world'
]


def load_and_cache_dataset(base_dir):
    data = {}

    # process each category directory
    for category in categories:
        # initialize the list for this category
        data[category] = []

        # construct the path to the category folder
        category_path = os.path.join(base_dir, f'{category}_data')

        # process each file for the current category
        for day in range(1, 31):
            # construct the full file path
            file_path = os.path.join(
                category_path, f'{category}_data_day_{day}.csv' if category != 'world' else f'{category}_array_data_day_{day}.csv')

            # read file into a df, skip first column
            df = pd.read_csv(file_path, usecols=[3])

            # clean NaN values
            df.fillna(float('-inf'), inplace=True)

            # reshape the data to a list of lists
            day_data = [df['value'][i:i+100].tolist()
                        for i in range(0, df.shape[0], 100)]

            # append the day data
            data[category].append(day_data)
    cache.set('data', data)
    return
