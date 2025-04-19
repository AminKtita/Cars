# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class CarscraperItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    pass

class CarItem(scrapy.Item):
    url=scrapy.Field()
    vehicle_title=scrapy.Field()
    price=scrapy.Field()
    car_ref_id=scrapy.Field()
    power_cv=scrapy.Field()
    mileage=scrapy.Field()
    power_cv_fiscal=scrapy.Field()
    number_of_cylinder=scrapy.Field()
    year=scrapy.Field()
    fuel_type=scrapy.Field()
    gearbox_type=scrapy.Field()
    model_name=scrapy.Field()
    brand_name=scrapy.Field()
    body_type=scrapy.Field()
    color=scrapy.Field()
    country=scrapy.Field()
    images=scrapy.Field()
    unique_id=scrapy.Field()
    source=scrapy.Field()
    last_updated=scrapy.Field()

    