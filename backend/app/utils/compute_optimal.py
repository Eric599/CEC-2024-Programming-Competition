import numpy as np
import math

def calculate_distance(point1, point2):
    return math.sqrt((point2[0] - point1[0])**2 + (point2[1] - point1[1])**2)


def get_starting_point(data, resources, preserves, unavailable_location=None):
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
                elif unavailable_location and calculate_distance(unavailable_location, sums_matrix[row_index][col_index]) > 2 and (row_index, col_index) == unavailable_location:
                    sums_matrix[row_index][col_index] = -float('inf')
                else:
                    if daily_data and daily_data[0] and daily_data[0][row_index]:
                        if category in resources:
                            sums_matrix[row_index][col_index] += daily_data[0][row_index][col_index]
                        elif category in preserves:
                            sums_matrix[row_index][col_index] -= daily_data[0][row_index][col_index]
                        else:
                            continue

    sums_matrix = np.array(sums_matrix)
    # This gives you the index in the flattened array
    max_index_flat = np.argmax(sums_matrix)
    max_index_2d = np.unravel_index(
        max_index_flat, sums_matrix.shape)  # Convert to 2D index

    return (max_index_2d)


def get_next_move(data, resources, preserves, x, y, day, unavailable_location = None, distance=5):
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
                elif unavailable_location and calculate_distance(unavailable_location, sums_matrix[row_index][col_index]) > 2 and (row_index, col_index) == unavailable_location:
                    sums_matrix[row_index][col_index] = -float('inf')
                else:
                    if daily_data and daily_data[day] and daily_data[day][row_index]:
                        if category in resources:
                            sums_matrix[row_index][col_index] += daily_data[day][row_index][col_index]
                        elif category in preserves:
                            sums_matrix[row_index][col_index] -= daily_data[day][row_index][col_index]
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
    coordinates1 = []
    start_point1 = get_starting_point(data, resources, preserve)
    coordinates1.append(start_point1)

    coordinates2 = []
    start_point2 = get_starting_point(data, resources, preserve, start_point1)
    coordinates2.append(start_point2)
    
    for i in range(len(data["wind"])):
        #Drill 1
        y = coordinates1[i][0]
        x = coordinates1[i][1]
        coordinates1.append(get_next_move(data, resources, preserve, y, x, i))
        
        #Drill 2
        y2 = coordinates2[i][0]
        x2 = coordinates2[i][1]
        coordinates2.append(get_next_move(data, resources, preserve, y2, x2, i, coordinates1[i]))


    return coordinates1, coordinates2
