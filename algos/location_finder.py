

rig1_locations = [None] * 30  # Array to store daily locations for rig1
rig2_locations = [None] * 30  # Array to store daily locations for rig2


previous_location_rig1 = initial_location_rig1
previous_location_rig2 = initial_location_rig2


for day in range(30):

    day_data = get_day_data(day)