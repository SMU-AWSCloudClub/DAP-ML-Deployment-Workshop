# DAP-ML-Deployment-Workshop

This repository contains a Python-based linear regression model for predicting housing prices based on various factors like floor area, mid storey level, flat type, and proximity to amenities among others. This guide will walk you through setting up the environment, building the Docker container, and using the application.

## Prerequisites

Before you start, ensure you have Docker installed on your system. You can download it from [Docker's official website](https://www.docker.com/get-started).

## Getting Started

Clone this repository to your local machine to get started with the app deployment.

```bash
git clone https://github.com/yourusername/DAP-ML-Deployment-Workshop.git
cd DAP-ML-Deployment-Workshop
```

### Setting Up the Environment

It's recommended to use a virtual environment to isolate the project dependencies. Install `virtualenv` if you haven't already, and set up a virtual environment.

```bash
pip install virtualenv
virtualenv venv
source venv/bin/activate # On Windows use `venv\Scripts\activate`
```

Install the required Python packages.

```bash
pip install -r requirements.txt
```

### Running the Application with Uvicorn

To run the application locally without Docker, use Uvicorn as follows:

```bash
uvicorn app:app --reload
```

This will start the FastAPI application which you can access at `http://localhost:8000`.

### Dockerizing the Application

To containerize the application, follow these steps:

1. **Build the Docker Image**

   Use the Dockerfile provided in the repository to build your Docker image.

   ```bash
   docker build -t fastapi-app .
   ```

2. **Run the Docker Container**

   After the build completes, you can run the Docker container.

   ```bash
   docker run -p 8080:8080 fastapi-app
   ```

   This command maps port 8080 of the container to port 8080 on your host, allowing you to access the FastAPI application at `http://localhost:8080`.

### Pushing the Docker Image to a Registry

Optionally, if you wish to share your Docker image, you can tag and push it to Docker Hub or any other Docker registry.

```bash
docker tag fastapi-app yourusername/fastapi-app
docker push yourusername/fastapi-app
```

Replace `yourusername` with your Docker Hub username.

## Making Predictions

To make predictions, send a POST request to the `/predict` endpoint with a JSON payload. For example:

```bash
curl -X 'POST' \
  'http://localhost:8080/predict' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
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
}'
```

This request sends data to the model and returns a prediction response.