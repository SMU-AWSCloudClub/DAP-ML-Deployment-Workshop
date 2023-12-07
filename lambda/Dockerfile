FROM public.ecr.aws/lambda/python:3.8

# Copy requirements.txt
COPY requirements.txt ${LAMBDA_TASK_ROOT}

# Install the specified packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy function code
COPY lambda_function.py ${LAMBDA_TASK_ROOT}
COPY models/lr_pipe.pkl ${LAMBDA_TASK_ROOT}/models/lr_pipe.pkl

# Set the CMD to your handler
CMD ["lambda_function.handler"]