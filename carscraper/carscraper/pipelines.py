import pymongo
import logging
from datetime import datetime

class MongoDBPipeline:
    def __init__(self, mongo_uri, mongo_db):
        self.mongo_uri = mongo_uri
        self.mongo_db = mongo_db
        logging.basicConfig(level=logging.INFO)  # Set logging level

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
        unique_id = item.get('car_ref_id')

        if unique_id is None:
            logging.warning(f"[{spider.name}] Skipping item with missing car_ref_id: {item}")
            return item  # Skip inserting this item

        # Convert car_ref_id to int64 (Python's int handles this)
        try:
            unique_id = int(unique_id)  # Ensure it's treated as int64
        except (ValueError, TypeError):
            logging.warning(f"[{spider.name}] Invalid car_ref_id: {unique_id}. Skipping insert.")
            return item

        # Log the car_ref_id and its type
        logging.info(f"[{spider.name}] Processing item: car_ref_id={unique_id} (Type: {type(unique_id).__name__})")

        # Check if item exists in MongoDB
        existing_item = self.collection.find_one({"car_ref_id": unique_id, "source": spider.name})

        if existing_item:
            # Compare existing item with new item
            if self._has_changed(existing_item, item):
                # Update the existing item
                item['last_updated'] = datetime.utcnow()  # Add a timestamp for the update
                self.collection.update_one(
                    {"car_ref_id": unique_id, "source": spider.name},
                    {"$set": dict(item)}
                )
                logging.info(f"[{spider.name}] Updated item: car_ref_id={unique_id}")
            else:
                logging.info(f"[{spider.name}] No changes detected for car_ref_id={unique_id}. Skipping update.")
        else:
            # Insert new item
            item['unique_id'] = unique_id  # Ensure the item has the converted car_ref_id
            item['source'] = spider.name
            item['last_updated'] = datetime.utcnow()  # Add a timestamp for the insert
            self.collection.insert_one(dict(item))
            logging.info(f"[{spider.name}] Inserted new item: {item}")

        return item

    def _has_changed(self, existing_item, new_item):
        # Compare all fields except 'last_updated' and '_id'
        for key, value in new_item.items():
            if key not in ['last_updated', '_id'] and existing_item.get(key) != value:
                return True
        return False