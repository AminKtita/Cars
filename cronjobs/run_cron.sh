#!/bin/sh

# Log the start time
echo "===================" >> /var/log/cron.log
echo "Cron job started at $(date)" >> /var/log/cron.log

# Test DNS resolution
echo "Testing DNS resolution for scrapy-api:" >> /var/log/cron.log
getent hosts scrapy-api >> /var/log/cron.log 2>&1 || echo "DNS resolution failed" >> /var/log/cron.log

# Run the curl command with verbose output
echo "Running curl command:" >> /var/log/cron.log
curl -v --max-time 30 -X POST "http://scrapy-api:8002/scrape" >> /var/log/cron.log 2>&1

# Log the exit code
echo "Curl exit code: $?" >> /var/log/cron.log

# Log the end time
echo "Cron job finished at $(date)" >> /var/log/cron.log
echo "===================" >> /var/log/cron.log
