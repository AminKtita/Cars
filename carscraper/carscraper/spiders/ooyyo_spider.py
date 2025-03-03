# import scrapy
# import json
# from urllib.parse import urljoin
# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service
# from selenium.webdriver.chrome.options import Options
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
# from scrapy import signals

# class OoyyoSpider(scrapy.Spider):
#     name = "ooyyo"
#     allowed_domains = ["ooyyo.com"]
#     start_urls = ["https://www.ooyyo.com/germany/used-cars-for-sale/c=CDA31D7114D3854F111BFE6FAA651453/"]

#     def __init__(self, *args, **kwargs):
#         super(OoyyoSpider, self).__init__(*args, **kwargs)
#         chrome_options = Options()
#         chrome_options.add_argument("--headless")
#         chrome_options.add_argument("--disable-gpu")
#         chrome_options.add_argument("--no-sandbox")
#         #self.driver = webdriver.Chrome(service=Service(r"C:\Users\AMIN\Desktop\cars\carscraper\chromedriver-win64\chromedriver.exe"), options=chrome_options)
#         self.driver = webdriver.Chrome(service=Service("/usr/local/bin/chromedriver"), options=chrome_options)


#     @classmethod
#     def from_crawler(cls, crawler, *args, **kwargs):
#         spider = super(OoyyoSpider, cls).from_crawler(crawler, *args, **kwargs)
#         crawler.signals.connect(spider.spider_closed, signals.spider_closed)
#         return spider

#     def spider_closed(self, spider):
#         self.driver.quit()

#     def parse(self, response):
#         car_links = response.css('div.resultset a.car-card-1::attr(href)').getall()
#         for car_link in car_links:
#             full_car_url = urljoin(response.url, car_link)
#             self.logger.info(f"Following car link: {full_car_url}")
#             yield scrapy.Request(url=full_car_url, callback=self.parse_car)

#     def parse_car(self, response):
#         self.driver.get(response.url)
#         try:
#             WebDriverWait(self.driver, 10).until(
#                 EC.presence_of_element_located((By.CSS_SELECTOR, 'script'))
#             )
#             network_logs = self.driver.execute_script("return window.performance.getEntriesByType('resource');")
#             for log in network_logs:
#                 if 'ooyyo-services/resources/cars/outlets' in log['name']:
#                     api_url = log['name']
#                     self.logger.info(f"Found API URL: {api_url}")
#                     yield scrapy.Request(url=api_url, callback=self.parse_api)
#                     break
#         except Exception as e:
#             self.logger.error(f"Failed to extract API URL: {e}")

#     def parse_api(self, response):
#         try:
#             data = json.loads(response.body)
#             car_data = data.get('detail_under_graph', [])[0].get('attributeMap', {}).get('car', {})
#             img_url = car_data.get('imgUrl', {})  
#             if car_data:
#                 yield {
#                 'vehicle_title': car_data.get('url', {}).get('title', 'N/A'), 
#                 'price': car_data.get('itemDisplayPrice', 'N/A'),
#                 'power_cv': car_data.get('displayPower', 'N/A'),
#                 'mileage': car_data.get('mileage', 'N/A'),
#                 'year': car_data.get('year', 'N/A'),  
#                 'fuel_type': car_data.get('fueltype', 'N/A'), 
#                 'gearbox_type': car_data.get('transmission', 'N/A'), 
#                 'model_name': car_data.get('model', 'N/A'), 
#                 'color': car_data.get('color', 'N/A'),
#                 'country': car_data.get('country', 'N/A'),  
#                 'images': [img_url.get('lg', 'N/A')] if img_url else ['N/A']
#                 }
#             else:
#                 self.logger.warning("No car data found in API response.")
#         except json.JSONDecodeError as e:
#             self.logger.error(f"Failed to parse JSON: {e}")


import scrapy
import json
from urllib.parse import urljoin, quote

class OoyyoSpider(scrapy.Spider):
    name = "ooyyo"
    allowed_domains = ["ooyyo.com"]
    start_urls = ["https://www.ooyyo.com/germany/used-cars-for-sale/c=CDA31D7114D3854F111BFE6FAA651453/"]

    def parse(self, response):
        car_links = response.css('div.resultset a.car-card-1::attr(href)').getall()
        for car_link in car_links:
            full_car_url = urljoin(response.url, car_link)
            self.logger.info(f"Following car link: {full_car_url}")
            yield scrapy.Request(url=full_car_url, callback=self.parse_car)

    def parse_car(self, response):
        # Extract the code and idRecord from the car URL
        code = response.url.split("c=")[1].split("/")[0]
        id_record = response.url.split("/")[-2].replace(".html", "")

        # Construct the JSON payload
        json_payload = {
            "idDomain": "1",
            "idPageType": "1",
            "idCountry": "10",
            "idLanguage": "47",
            "idCurrency": "3",
            "isNew": "0",
            "code": code,
            "idRecord": id_record,
            "page": "1",
            "lengthUnitSymbol": "km",
            "currencySymbol": "EUR",
            "clientCountry": "31",
            "ip": "102.31.203.179",
            "referrer": response.url,
            "pageName": "detail"
        }

        # URL-encode the JSON payload
        encoded_json = quote(json.dumps(json_payload))
        
        # Build the final API URL
        api_url = f"https://analytics.ooyyo.com/ooyyo-services/resources/cars/outlets?json={encoded_json}"
        self.logger.info(f"Constructed API URL: {api_url}")
        yield scrapy.Request(url=api_url, callback=self.parse_api)

    def parse_api(self, response):
        try:
            data = json.loads(response.body)
            detail_under_graph = data.get('detail_under_graph', [])
            
            if not detail_under_graph:
                self.logger.warning(f"Empty 'detail_under_graph' in API response: {response.url}")
                return
            
            attribute_map = detail_under_graph[0].get('attributeMap', {})
            if not attribute_map:
                self.logger.warning(f"Empty 'attributeMap' in API response: {response.url}")
                return
            
            car_data = attribute_map.get('car', {})
            if not car_data:
                self.logger.warning(f"Empty 'car' data in API response: {response.url}")
                return
            
            img_url = car_data.get('imgUrl', {})
            yield {
                'vehicle_title': car_data.get('url', {}).get('title', 'N/A'),
                'price': car_data.get('itemDisplayPrice', 'N/A'),
                'car_ref_id': car_data.get('idRecord', 'N/A'),
                'power_cv': car_data.get('displayPower', 'N/A'),
                'mileage': car_data.get('mileage', 'N/A'),
                'power_cv_fiscal': car_data.get('makemake', 'N/A'),
                'number_of_cylinder': car_data.get('makemake', 'N/A'),
                'year': car_data.get('year', 'N/A'),
                'fuel_type': car_data.get('fueltype', 'N/A'),
                'gearbox_type': car_data.get('transmission', 'N/A'),
                'model_name': car_data.get('model', 'N/A'),
                'brand_name': car_data.get('make', 'N/A'),
                'color': car_data.get('color', 'N/A'),
                'country': car_data.get('country', 'N/A'),
                'images': [img_url.get('lg', 'N/A')] if img_url else ['N/A']
            }
        except json.JSONDecodeError as e:
            self.logger.error(f"Failed to parse JSON: {e}")