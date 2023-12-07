from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import pickle

app = FastAPI()

# Define the input data model using Pydantic
class InputData(BaseModel):
    floor_area_sqm: float
    mid_storey: int
    full_flat_type: str
    commercial: int
    planning_area: str
    mall_nearest_distance: float
    hawker_nearest_distance: float
    mrt_nearest_distance: float
    mrt_interchange: int
    pri_sch_nearest_distance: float
    pri_sch_name: str
    pri_sch_affiliation: int
    sec_sch_nearest_dist: float
    sec_sch_name: str
    age_when_sold: int

# Load the saved model from the pickle file
with open('models/lr_pipe.pkl', 'rb') as file:
    loaded_model = pickle.load(file)

# Define the prediction endpoint
@app.post("/predict")
async def predict(data: InputData):
    # Convert input data to DataFrame
    input_data = pd.DataFrame([data.dict()])

    # Make predictions using the loaded model
    prediction = loaded_model.predict(input_data)

    return {"prediction": float(prediction[0])}