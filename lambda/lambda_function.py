import logging
import pandas as pd
import pickle
import json

# Load the saved model from the pickle file
with open('models/lr_pipe.pkl', 'rb') as file:
    loaded_model = pickle.load(file)

# # Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()

def handler(event, context):
    logger.info("Received event: %s", event)

    # Parse JSON payload
    request_body = event['body']
    try:
        event_data = json.loads(request_body)
    except json.JSONDecodeError as e:
        logger.error("Error decoding JSON: %s", str(e))
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Invalid JSON payload'})
        }

    # Log the parsed data
    logger.info("Parsed JSON data: %s", event_data)

    # Assuming the test data is stored in a DataFrame named 'test_data'
    test_data = pd.DataFrame({
        'floor_area_sqm': [event_data['floor_area_sqm']],
        'mid_storey': [event_data['mid_storey']],
        'full_flat_type': [event_data['full_flat_type']],
        'commercial': [event_data['commercial']],
        'planning_area': [event_data['planning_area']],
        'mall_nearest_distance': [event_data['mall_nearest_distance']],
        'hawker_nearest_distance': [event_data['hawker_nearest_distance']],
        'mrt_nearest_distance': [event_data['mrt_nearest_distance']],
        'mrt_interchange': [event_data['mrt_interchange']],
        'pri_sch_nearest_distance': [event_data['pri_sch_nearest_distance']],
        'pri_sch_name': [event_data['pri_sch_name']],
        'pri_sch_affiliation': [event_data['pri_sch_affiliation']],
        'sec_sch_nearest_dist': [event_data['sec_sch_nearest_dist']],
        'sec_sch_name': [event_data['sec_sch_name']],
        'age_when_sold': [event_data['age_when_sold']]
    })

    # Make predictions on the test data
    prediction = loaded_model.predict(test_data)

    # Log the prediction
    logger.info("Prediction: %s", prediction)

    return {
        'statusCode': 200,
        'body': json.dumps({"prediction": prediction[0]})
    }