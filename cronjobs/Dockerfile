# Use Ubuntu as the base image
FROM ubuntu:24.04

# Install cron and curl
RUN apt-get update && apt-get install -y cron curl

# Copy the cron job file
COPY scrapy_cron /etc/cron.d/scrapy_cron

# Set permissions for the cron job file
RUN chmod 0644 /etc/cron.d/scrapy_cron

# Add the cron job to crontab
RUN crontab /etc/cron.d/scrapy_cron

# Copy the run_cron.sh script
COPY run_cron.sh /usr/local/bin/run_cron.sh

# Set executable permissions for the script
RUN chmod +x /usr/local/bin/run_cron.sh

# Create the log file and set permissions
RUN touch /var/log/cron.log && chmod 666 /var/log/cron.log

# Start cron in the foreground
CMD ["cron", "-f"]