# DAP-ML-Deployment-Workshop

pip install virtualenv
virtualenv venv
pip install -r requirements.txt
python simple_linear_regression.py

uvicorn app:app --reload

POST
localhost:8000/predict
{
  "floor_area_sqm": 90.0,
  "mid_storey": 11,
  "full_flat_type": "4 ROOM Model A",
  "commercial": 0,
  "planning_area": "Kallang",
  "mall_nearest_distance": 1094.090418,
  "hawker_nearest_distance": 154.7533573,
  "mrt_nearest_distance": 330.0830689707568,
  "mrt_interchange": 0,
  "pri_sch_nearest_distance": 1138.6334215866475,
  "pri_sch_name": "Geylang Methodist School",
  "pri_sch_affiliation": 1,
  "sec_sch_nearest_dist": 1138.6334215866475,
  "sec_sch_name": "Geylang Methodist School",
  "age_when_sold": 10
}

docker build -t fastapi-app .
docker run -p 8080:8080 fastapi-app
docker tag fastapi-app pharqeet/fastapi-app
docker push pharqeet/fastapi-app