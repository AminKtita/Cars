import scrapy
import json
from carscraper.items import CarItem

class CarspiderSpider(scrapy.Spider):
    name = "carspider"
    allowed_domains = ["cartobike.com"]
    
    def start_requests(self):
        """Start scraping the main API to get car slugs."""
        start_url = 'https://api.cartobike.com/api/ad_vehicles?filter[type_of_sale]=0&page=1&filter[product_type_id]=1&filter[keyword]=&sort=&filter[country_slug]=france&per_page=20&lang=en'
        yield scrapy.Request(url=start_url, callback=self.parse_list)

    def parse_list(self, response):
        """Parse the main API to extract slugs and request detailed pages."""
        data = json.loads(response.body)

        if data.get('success'):
            ads = data.get('data', {}).get('ads', {}).get('data', [])
            
            for ad in ads:
                slug = ad.get("slug")
                if slug:
                    detail_url = f'https://api.cartobike.com/api/ad_vehicles/{slug}?lang=en'
                    yield scrapy.Request(url=detail_url, callback=self.parse_details)

            # Pagination handling
            current_page = data.get('data', {}).get('ads', {}).get('current_page', 1)
            last_page = data.get('data', {}).get('ads', {}).get('last_page', 1)

            if current_page < last_page:
                next_page = current_page + 1
                next_url = f'https://api.cartobike.com/api/ad_vehicles?filter[type_of_sale]=0&page={next_page}&filter[product_type_id]=1&filter[keyword]=&sort=&filter[country_slug]=france&per_page=20&lang=en'
                #yield scrapy.Request(url=next_url, callback=self.parse_list)

    def parse_details(self, response):
        """Parse detailed car data from the individual API."""
        data = json.loads(response.body)

        if data.get('success'):
            ad = data.get('data', {}).get('item', {})
            owner_vehicle = ad.get('owner_vehicle', {})
            slug = ad.get("slug")
            url= f'https://cartobike.com/en/public-ads/{slug}?lang=en'
            car_item= CarItem()

            car_item['url'] = url,
            car_item['vehicle_title'] = owner_vehicle.get('full_title'),
            car_item['price'] = ad.get('total_price'),
            car_item['car_ref_id'] = ad.get('id'),
            car_item['power_cv'] = owner_vehicle.get('power_cv'),
            car_item['mileage'] = owner_vehicle.get('vehicle_mileage'),
            car_item['power_cv_fiscal'] = owner_vehicle.get('power_cv_fiscal'),
            car_item['number_of_cylinder'] = owner_vehicle.get('number_of_cylinder'),
            car_item['year'] = owner_vehicle.get('vehicle_first_register_year'),
            car_item['fuel_type'] = owner_vehicle.get('fuel', {}).get('name', 'N/A'),
            car_item['gearbox_type'] = owner_vehicle.get('gearbox', {}).get('name', 'N/A'),
            car_item['model_name'] = owner_vehicle.get('model', {}).get('model_name', 'N/A'),
            car_item['brand_name'] = owner_vehicle.get('model', {}).get('brand_car', {}).get('name', 'N/A'),
            car_item['body_type'] = owner_vehicle.get('body_vehicle', {}).get('name', 'N/A'),
            car_item['color'] = owner_vehicle.get('outside_color', {}).get('name', 'N/A') if owner_vehicle.get('outside_color') else 'N/A',
            car_item['country'] = ad.get('user_data', {}).get('limited_address', {}).get('country', 'N/A'),
            car_item['images'] = [media.get('original_url', 'N/A') for media in owner_vehicle.get('media', [])] if owner_vehicle else ['N/A']

            yield car_item
