FROM python:3.10-slim

WORKDIR /app

# Install system dependencies for Scrapy and other packages
RUN apt-get update && \
    apt-get install -y libxml2-dev libxslt1-dev zlib1g-dev gcc && \
    apt-get clean

# Copy requirements first for better layer caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy both Scrapy project and API code
COPY . .

# Expose API port
EXPOSE 8002

# Start the FastAPI application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8002"]