import numpy as np


def get_starting_point(data, resources, preserves):
    # Assuming all categories have the same structure for the first day,
    # determine the number of rows and columns from the first category's first day.
    # This assumes at least one category exists and has at least one day of data.
    sample_category = next(iter(data.values()))
    num_rows = len(sample_category[0])
    num_columns = len(sample_category[0][0])

    # Initialize a 2D list (matrix) to hold the sums of corresponding data points
    # This matrix has the same dimensions as the data for a day
    sums_matrix = [[0 for _ in range(num_columns)] for _ in range(num_rows)]

    # Iterate over each category in the data dictionary
    for category, daily_data in data.items():
        # Iterate over each row
        for row_index in range(len(daily_data[0])):
            # Iterate over each column
            for col_index in range(len(daily_data[0][row_index])):
                # Add the data point to the corresponding position in the sums_matrix
                # Make sure the data exists to avoid IndexError
                if data['world'][0][row_index][col_index] == 1:
                    sums_matrix[row_index][col_index] = -float('inf')
                else:
                    if daily_data and daily_data[0] and daily_data[0][row_index]:
                        if category in resources:
                            sums_matrix[row_index][col_index] += daily_data[0][row_index][col_index]
                        elif category in preserves:
                            sums_matrix[row_index][col_index] -= daily_data[0][row_index][col_index]
                        elif len(data['wind'][0]) > row_index and len(data['wind'][0][row_index]) > col_index and data['wind'][0][row_index][col_index] > 10:
                            sums_matrix[row_index][col_index] *= 0.8
                        else:
                            continue

    sums_matrix = np.array(sums_matrix)
    # This gives you the index in the flattened array
    max_index_flat = np.argmax(sums_matrix)
    max_index_2d = np.unravel_index(
        max_index_flat, sums_matrix.shape)  # Convert to 2D index

    return (max_index_2d)


def get_next_move(data, resources, preserves, x, y, day, distance=5):
    sample_category = next(iter(data.values()))
    num_rows = len(sample_category[0])
    num_columns = len(sample_category[0][0])

    sums_matrix = [[0 for _ in range(num_columns)] for _ in range(num_rows)]

    # Determine the range of rows and columns to iterate over, limited by the distance
    # and ensuring we don't go out of bounds of the matrix.
    row_start = max(0, x - distance)
    row_end = min(num_rows, x + distance + 1)
    col_start = max(0, y - distance)
    col_end = min(num_columns, y + distance + 1)

    for category, daily_data in data.items():
        for row_index in range(row_start, row_end):
            for col_index in range(col_start, col_end):
                if data['world'][day][row_index][col_index] == 1:
                    sums_matrix[row_index][col_index] = -float('inf')
                else:
                    if daily_data and daily_data[day] and daily_data[day][row_index]:
                        if category in resources:
                            sums_matrix[row_index][col_index] += daily_data[day][row_index][col_index]
                        elif category in preserves:
                            sums_matrix[row_index][col_index] -= daily_data[day][row_index][col_index]
                        elif len(data['wind'][day]) > row_index and len(data['wind'][day][row_index]) > col_index and data['wind'][day][row_index][col_index] > 10:
                            sums_matrix[row_index][col_index] *= 0.8
                        else:
                            continue

    # Convert to numpy array for easier manipulation
    sums_matrix = np.array(sums_matrix)

    # Find the max value within the specified range
    max_value_within_range = np.max(
        sums_matrix[row_start:row_end, col_start:col_end])
    # Find the index of the max value within the range
    max_index_within_range = np.unravel_index(np.argmax(
        sums_matrix[row_start:row_end, col_start:col_end]), sums_matrix[row_start:row_end, col_start:col_end].shape)

    # Adjust the max index based on the actual start positions
    max_index_adjusted = [
        int(max_index_within_range[0] + row_start), int(max_index_within_range[1] + col_start)]

    return max_index_adjusted


def get_route(data, resources, preserve):
    coordinates = []
    start_point = get_starting_point(data, resources, preserve)
    coordinates.append(start_point)
    for i in range(len(data["wind"])):
        y = coordinates[i][0]
        x = coordinates[i][1]
        coordinates.append(get_next_move(data, resources, preserve, y, x, i))
    return coordinates