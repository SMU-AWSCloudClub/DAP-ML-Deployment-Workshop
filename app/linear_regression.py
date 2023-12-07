import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import make_column_transformer
from sklearn.pipeline import make_pipeline
import pickle

# Read the data
df = pd.read_csv('../data/04_cleaned_df.csv')

# Define numerical and categorical columns
num_columns = ['floor_area_sqm', 'mid_storey', 'mall_nearest_distance', 'hawker_nearest_distance',
               'mrt_nearest_distance', 'pri_sch_nearest_distance', 'sec_sch_nearest_dist', 'age_when_sold']

cat_columns = ['full_flat_type', 'commercial', 'planning_area', 'mrt_interchange',
               'pri_sch_affiliation', 'pri_sch_name', 'sec_sch_name']

# Separate features and target variable
X = df.drop(columns='resale_price')
y = df['resale_price']

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=123)

# Instantiate transformers
ohe = OneHotEncoder(min_frequency=10)
ss = StandardScaler()

# Create a column transformer
ct = make_column_transformer(
    (ohe, cat_columns),
    (ss, num_columns)
)

# Instantiate Linear Regression
lr = LinearRegression()

# Create a pipeline with the column transformer and linear regression
lr_pipe = make_pipeline(ct, lr)

# Fit the pipeline to the training data
lr_pipe.fit(X_train, y_train)

# Linear Regression Scores
train_score = lr_pipe.score(X_train, y_train)
test_score = lr_pipe.score(X_test, y_test)
print(f"The train score is: {train_score}")
print(f"The test score is: {test_score}")

# Predictions and evaluation
y_test_preds_lr = lr_pipe.predict(X_test)

# Linear Regression Root Mean Squared Error
lr_rmse = np.sqrt(mean_squared_error(y_test, y_test_preds_lr))
print(f'The root mean squared error is {lr_rmse}')

# Save the model to a file
with open('models/lr_pipe.pkl', 'wb') as file:
    pickle.dump(lr_pipe, file)

print('Model saved to lr_pipe.pkl')