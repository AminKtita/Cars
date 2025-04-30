import pymongo
import logging
from datetime import datetime
from scrapy.exceptions import DropItem


BRAND_NORMALIZATION = {
    'mercedes benz': 'Mercedes-Benz',
    'mercedes-benz': 'Mercedes-Benz',
    'bmw': 'BMW',
    'vw': 'Volkswagen',
}
BODY_NORMALIZATION = {
    'SUV/4x4': 'Suv',
    'Suv/4X4': 'Suv',
    'Suv': 'Suv',
    'hatchback': 'Hatchback',
    'Hatchback': 'Hatchback',
    'Saloon ': 'Sedan ',
    'Sedan': 'Sedan',
    'Estate': 'Wagon ',
    'Crossover': 'Suv',
    'Coupé': 'Coupe',
    'Minibus ': 'Van',


}

FUEL_TYPE_NORMALIZATION = {
    'diesel': 'Diesel',
    'petrol': 'Petrol',
    'electric': 'Electric',
    'hybrid': 'Hybrid',
    'hybrid (p/e)': 'Hybrid',
    'lpg': 'LPG',
    'ethanol': 'Ethanol'
}

GEARBOX_NORMALIZATION = {
    'auto': 'Auto',
    'automatic': 'Auto',
    'manual': 'Manual'
}

class MongoDBPipeline:
    def __init__(self, mongo_uri, mongo_db):
        self.mongo_uri = mongo_uri
        self.mongo_db = mongo_db
        logging.basicConfig(level=logging.INFO)  

    @classmethod
    def from_crawler(cls, crawler):
        return cls(
            mongo_uri=crawler.settings.get('MONGO_URI'),
            mongo_db=crawler.settings.get('MONGO_DATABASE')
        )

    def open_spider(self, spider):
        self.client = pymongo.MongoClient(self.mongo_uri)
        self.db = self.client[self.mongo_db]
        self.collection = self.db["carspider"]
        logging.info(f"Connected to MongoDB: {self.mongo_uri}, Database: {self.mongo_db}")

    def close_spider(self, spider):
        self.client.close()
        logging.info("Closed MongoDB connection.")

    def process_item(self, item, spider):
        self.normalize_fields(item)
        unique_id = item.get('car_ref_id')

        if unique_id is None:
            logging.warning(f"[{spider.name}] Skipping item with missing car_ref_id: {item}")
            return item  
        if not self.has_valid_images(item):
            spider.logger.warning(f"Dropping item without images: {item}")
            raise DropItem("Missing or invalid images field")

        try:
            unique_id = int(unique_id)  
        except (ValueError, TypeError):
            logging.warning(f"[{spider.name}] Invalid car_ref_id: {unique_id}. Skipping insert.")
            return item

        logging.info(f"[{spider.name}] Processing item: car_ref_id={unique_id} (Type: {type(unique_id).__name__})")

        # Check if item exists in MongoDB
        existing_item = self.collection.find_one({"car_ref_id": unique_id, "source": spider.name})

        if existing_item:
            # Compare existing item with new item
            if self._has_changed(existing_item, item):
                # Update the existing item
                item['last_updated'] = datetime.utcnow()  
                self.collection.update_one(
                    {"car_ref_id": unique_id, "source": spider.name},
                    {"$set": dict(item)}
                )
                logging.info(f"[{spider.name}] Updated item: car_ref_id={unique_id}")
            else:
                logging.info(f"[{spider.name}] No changes detected for car_ref_id={unique_id}. Skipping update.")
        else:
            # Insert new item
            item['unique_id'] = unique_id  
            item['source'] = spider.name
            item['last_updated'] = datetime.utcnow() 
            self.collection.insert_one(dict(item))
            logging.info(f"[{spider.name}] Inserted new item: {item}")

        return item
    def has_valid_images(self, item):
        """Validate images field meets requirements"""
        images = item.get('images')
        
        if not isinstance(images, list):
            return False
            
        return any(
            isinstance(url, str) and url.startswith('http')
            for url in images
        )

    def _has_changed(self, existing_item, new_item):
        for key, value in new_item.items():
            if key not in ['last_updated', '_id'] and existing_item.get(key) != value:
                return True
        return False
    
    def normalize_fields(self, item):
        """First convert tuple values to single values"""
        self.convert_tuples_to_values(item)
        self.normalize_brand(item)
        self.normalize_body_types(item)
        self.normalize_fuel_type(item)
        self.normalize_gearbox(item)
        self.normalize_generic_fields(item)

    def convert_tuples_to_values(self, item):
        """Convert all tuple/list values to single values"""
        for key in item.fields:
            if key in item and isinstance(item[key], (tuple, list)):
                if key == 'images':
                    item[key] = [str(url) for url in item[key]]
                else:
                    # Take first element and convert to string
                    item[key] = str(item[key][0]) if len(item[key]) > 0 else ''

    def normalize_brand(self, item):
        """Normalize brand names with case handling and variant unification"""
        if 'brand_name' in item:
            original = item['brand_name'].lower().strip()
            
            # First try direct replacement from normalization map
            normalized = BODY_NORMALIZATION.get(original, original)
            
            # Handle case for non-mapped brands
            if normalized == original:
                # Standardize capitalization and hyphens
                normalized = original.replace('-', ' ').title()
                
            item['brand_name'] = normalized

    def normalize_body_types(self, item):
        """Normalize body types names with case handling and variant unification"""
        if 'body_type' in item:
            original = item['body_type'].lower().strip()
            
            # First try direct replacement from normalization map
            normalized = BRAND_NORMALIZATION.get(original, original)
            
            # Handle case for non-mapped brands
            if normalized == original:
                # Standardize capitalization and hyphens
                normalized = original.replace('-', ' ').title()
                
            item['body_type'] = normalized


    def normalize_fuel_type(self, item):
        """Unify fuel type variations"""
        if 'fuel_type' in item:
            fuel = item['fuel_type'].lower()
            # Remove parentheses and their content
            fuel = fuel.split('(')[0].strip()
            # Map using normalization dictionary
            item['fuel_type'] = FUEL_TYPE_NORMALIZATION.get(fuel, fuel.title())


    def normalize_gearbox(self, item):
        """Standardize gearbox type values"""
        if 'gearbox_type' in item:
            gearbox = item['gearbox_type'].lower().strip()
            item['gearbox_type'] = GEARBOX_NORMALIZATION.get(gearbox, gearbox.title())

    def normalize_generic_fields(self, item):
        """Handle general case normalization for other fields"""
        case_sensitive_fields = ['model_name', 'color', 'country']
        
        for field in case_sensitive_fields:
            if field in item and item[field]:
                item[field] = item[field].strip().title()
