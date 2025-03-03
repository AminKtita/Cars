# Use a Python image
FROM python:3.9-slim

# Set working directory
WORKDIR /app/

# Install system dependencies for scrapy
RUN apt-get update && apt-get install -y libxml2-dev libxslt1-dev zlib1g-dev

# Copy the requirements.txt and install dependencies
COPY scrapy-api/requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the 'carscraper' directory from the parent folder (the correct relative path)
COPY scrapy-api/main.py /app/
COPY carscraper /app/carscraper

# Expose the FastAPI port
EXPOSE 8002

# Start the FastAPI application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8002"]
