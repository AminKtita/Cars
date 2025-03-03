import scrapy
import json

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

            yield {
                'vehicle_title': owner_vehicle.get('full_title'),
                'price': ad.get('total_price'),
                'car_ref_id': ad.get('id'),
                'power_cv': owner_vehicle.get('power_cv'),
                'mileage': owner_vehicle.get('vehicle_mileage'),
                'power_cv_fiscal': owner_vehicle.get('power_cv_fiscal'),
                'number_of_cylinder': owner_vehicle.get('number_of_cylinder'),
                'year': owner_vehicle.get('vehicle_first_register_year'),
                'fuel_type': owner_vehicle.get('fuel', {}).get('name', 'N/A'),
                'gearbox_type': owner_vehicle.get('gearbox', {}).get('name', 'N/A'),
                'model_name': owner_vehicle.get('model', {}).get('model_name', 'N/A'),
                'brand_name': owner_vehicle.get('model', {}).get('brand_car', {}).get('name', 'N/A'),
                'color': owner_vehicle.get('outside_color', {}).get('name', 'N/A') if owner_vehicle.get('outside_color') else 'N/A',
                'country': ad.get('user_data', {}).get('limited_address', {}).get('country', 'N/A'),
                'images': [media.get('original_url', 'N/A') for media in owner_vehicle.get('media', [])] if owner_vehicle else ['N/A']
            }
