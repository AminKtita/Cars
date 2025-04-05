from fastapi import FastAPI
import subprocess
import os

app = FastAPI()

@app.post("/scrape")
def start_scrape():
    try:
        # Set the directory where the scrapy spider should run
        carscraper_dir = '/app/carscraper'
        
        # Run the Scrapy spider command in the carscraper directory
       # subprocess.run(['scrapy', 'crawl', 'carspider'], cwd=carscraper_dir)
        subprocess.Popen(["scrapy", "crawl", "ooyyo"],cwd=carscraper_dir)

        
        return {"status": "scraping started"}
    except subprocess.CalledProcessError as e:
        return {"status": "error", "message": str(e)}
