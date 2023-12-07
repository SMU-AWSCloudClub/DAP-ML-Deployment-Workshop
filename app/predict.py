import pandas as pd
import pickle

# Assuming the test data is stored in a DataFrame named 'test_data'
test_data = pd.DataFrame({
    'floor_area_sqm': [90.0],
    'mid_storey': [11],
    'full_flat_type': ['4 ROOM Model A'],
    'commercial': [0],
    'planning_area': ['Kallang'],
    'mall_nearest_distance': [1094.090418],
    'hawker_nearest_distance': [154.7533573],
    'mrt_nearest_distance': [330.0830689707568],
    'mrt_interchange': [0],
    'pri_sch_nearest_distance': [1138.6334215866475],
    'pri_sch_name': ['Geylang Methodist School'],
    'pri_sch_affiliation': [1],
    'sec_sch_nearest_dist': [1138.6334215866475],
    'sec_sch_name': ['Geylang Methodist School'],
    'age_when_sold': [10]
})

# Load the saved model from the pickle file
with open('models/lr_pipe.pkl', 'rb') as file:
    loaded_model = pickle.load(file)

# Make predictions on the test data
predictions = loaded_model.predict(test_data)

# Display the predictions
print("Predictions:")
print(predictions)