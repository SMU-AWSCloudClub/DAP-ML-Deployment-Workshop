import logging
import pandas as pd
import pickle
import json

# Load the saved model from the pickle file
with open("models/lr_pipe.pkl", "rb") as file:
    loaded_model = pickle.load(file)

logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Handle CORS
def generate_cors_response():
    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Headers": "Content-Type,Authorization",
            "Access-Control-Allow-Origin": "*",  # Or specify domains
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        "body": json.dumps({"message": "CORS configuration successful"}),
    }

def handler(event, context):
    # Extract the HTTP method from the nested 'requestContext' and 'http' dictionaries
    http_method = event['requestContext']['http']['method']

    # Log the received method
    logger.info(f"Received {http_method} request")

    # Check if the HTTP method is OPTIONS and return the CORS headers
    if http_method == "OPTIONS":
        logger.info("Received an OPTIONS request")
        return generate_cors_response()
    
    # Log the event
    logger.info("Received event: %s", event)

    # Check if 'body' exists in the event
    if "body" not in event:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Missing body in the event object"}),
        }

    # Parse JSON payload
    try:
        request_body = json.loads(event['body'])  # Parse the outer "body" as JSON
        event_data = json.loads(request_body["body"])  # Parse the inner "body" as JSON
    except json.JSONDecodeError as e:
        logger.error("Error decoding JSON: %s", str(e))
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Invalid JSON payload"}),
        }

    # Log the parsed data
    logger.info("Finished parsing JSON data: %s", event_data)

    # Check the type of event_data
    if not isinstance(event_data, dict):
        logger.error("event_data is not a dictionary")
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Invalid JSON payload format"}),
        }

    # Assuming the test data is stored in a DataFrame named 'test_data'
    test_data = pd.DataFrame(
        {
            "floor_area_sqm": [event_data["floor_area_sqm"]],
            "mid_storey": [event_data["mid_storey"]],
            "full_flat_type": [event_data["full_flat_type"]],
            "commercial": [event_data["commercial"]],
            "planning_area": [event_data["planning_area"]],
            "mall_nearest_distance": [event_data["mall_nearest_distance"]],
            "hawker_nearest_distance": [event_data["hawker_nearest_distance"]],
            "mrt_nearest_distance": [event_data["mrt_nearest_distance"]],
            "mrt_interchange": [event_data["mrt_interchange"]],
            "pri_sch_nearest_distance": [event_data["pri_sch_nearest_distance"]],
            "pri_sch_name": [event_data["pri_sch_name"]],
            "pri_sch_affiliation": [event_data["pri_sch_affiliation"]],
            "sec_sch_nearest_dist": [event_data["sec_sch_nearest_dist"]],
            "sec_sch_name": [event_data["sec_sch_name"]],
            "age_when_sold": [event_data["age_when_sold"]],
        }
    )

    # Make predictions on the test data
    prediction = loaded_model.predict(test_data)

    # Log the prediction
    logger.info("Hello World: %s", prediction)

    return {"statusCode": 200, "body": json.dumps({"prediction": prediction[0]})}
