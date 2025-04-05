import logging
import sys
import re
import pandas as pd
import numpy as np
from pymongo import MongoClient
from bson import ObjectId, errors
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity
from datetime import datetime

logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    stream=sys.stdout
)
logger = logging.getLogger(__name__)

class CarRecommender:
    def __init__(self, mongo_uri="mongodb://mongo:27017/scraped_data"):
        try:
            self.client = MongoClient(mongo_uri, serverSelectionTimeoutMS=5000)
            self.db = self.client.get_database()
            self.scaler = MinMaxScaler()
            logger.info("MongoDB connection successful")
        except Exception as e:
            logger.error(f"MongoDB connection failed: {str(e)}")
            raise

    def clean_numeric(self, series):
        return (
            series
            .astype(str)
            .str.replace(r'[^\d.]', '', regex=True)
            .replace('', '0')
            .astype(float)
            .fillna(0)
        )

    def get_all_cars(self):
        try:
            cars = list(self.db.carspider.find({}))
            for car in cars:
                car['_id'] = str(car['_id'])
            logger.info(f"Found {len(cars)} cars")
            return pd.DataFrame(cars)
        except Exception as e:
            logger.error(f"Error fetching cars: {str(e)}")
            return pd.DataFrame()

    def vectorize_cars(self, df):
        try:
            if df.empty:
                return pd.DataFrame()
            
            df = df.copy()
            non_feature_cols = [
                '_id', 'vehicle_title', 'car_ref_id', 
                'model_name', 'country', 'images', 
                'unique_id', 'source', 'color'
            ]
            
            # Clean and normalize numeric columns
            numeric_cols = ['price', 'power_cv', 'mileage', 'year',"power_cv_fiscal"]
            for col in numeric_cols:
                df[col] = self.clean_numeric(df[col])
            
            # Log raw values before normalization
            logger.debug("Raw numeric values sample:\n%s", 
                        df[numeric_cols].head(3).to_string())
            
            df[numeric_cols] = self.scaler.fit_transform(df[numeric_cols])
            
            # Log normalized values
            logger.debug("Normalized numeric values sample:\n%s", 
                        df[numeric_cols].head(3).to_string())
            
            # One-hot encode categoricals
            categoricals = ['fuel_type', 'gearbox_type', 'brand_name']
            df = pd.get_dummies(df, columns=categoricals)
            
            # Log categorical encoding
            dummy_cols = [c for c in df.columns if c.startswith(tuple(categoricals))]
            logger.debug("Categorical features sample:\n%s",
                        df[dummy_cols].head(3).to_string())
            
            # Separate features and ensure numeric types
            features = df.drop(columns=non_feature_cols, errors='ignore')
            features = features.apply(pd.to_numeric, errors='coerce').fillna(0)
            
            # Keep only _id from metadata
            result = pd.concat([df['_id'], features], axis=1)
            
            logger.info("Vectorization completed. Final feature columns:\n%s",
                       "\n".join(features.columns.tolist()))
            return result
            
        except Exception as e:
            logger.error(f"Vectorization failed: {str(e)}")
            raise

    def create_user_profile(self, user_id, car_vectors):
        try:
            # Use only feature columns (exclude _id)
            feature_columns = car_vectors.columns.difference(['_id'])
            user_vector = pd.Series(0, index=feature_columns)
            
            try:
                user_oid = ObjectId(user_id)
            except errors.InvalidId:
                logger.error(f"Invalid user ID: {user_id}")
                return user_vector
                
            actions = list(self.db.user_actions.find({"userId": user_oid}))
            favorites = list(self.db.favorites.find({"user": user_oid}))

            weights = {'view': 1, 'favorite': 3, 'filter': 2, 'search': 1.5}
            decay_rate = 0.95
            
            for action in actions:
                try:
                    action_type = action.get('actionType')
                    car_id = str(action.get('carId', ''))
                    weight = weights.get(action_type, 1)
                    age_days = (datetime.now() - action.get('timestamp', datetime.now())).days
                    weight *= (decay_rate ** age_days)
                    
                    if action_type in ['view', 'favorite'] and car_id in car_vectors.index:
                        car_features = car_vectors.loc[car_id, feature_columns]
                        contribution = car_features * weight
                        user_vector += contribution

                        logger.debug("Action: %s on car %s contributed:\n%s",
                                    action_type, car_id,
                                    contribution[contribution != 0].to_string())

                        
                    elif action_type == 'filter':
                        filters = action.get('details', {}).get('filters', {})
                        for brand in filters.get('selectedBrands', []):
                            col = f'brand_name_{brand}'
                            if col in user_vector:
                                user_vector[col] += weight
                                logger.debug("Filter action added %s to brand %s", 
                                    weight, brand)
                                
                    elif action_type == 'search':
                        query = action.get('details', {}).get('searchQuery', '').lower()
                        if 'ford' in query:
                            user_vector['brand_name_Ford'] += weight
                            
                except Exception as e:
                    logger.warning(f"Skipping invalid action: {str(e)}")
            
            # Process favorites
            for fav in favorites:
                car_id = str(fav.get('car', ''))
                if car_id in car_vectors.index:
                    car_features = car_vectors.loc[car_id, feature_columns]
                    user_vector += car_features * 2  # Extra weight for favorites

            logger.info("Final user profile vector:\n%s", 
                       user_vector.to_string())        
            return user_vector.fillna(0)
        except Exception as e:
            logger.error(f"Profile error: {str(e)}")
            raise

    def recommend(self, user_id, n=10):
        try:
            logger.info(f"Starting recommendation for {user_id}")
            
            cars_df = self.get_all_cars()
            if cars_df.empty:
                logger.warning("No cars available")
                return []
                
            car_vectors = self.vectorize_cars(cars_df).set_index('_id')
            if car_vectors.empty:
                return []
                
            user_profile = self.create_user_profile(user_id, car_vectors)
            similarities = cosine_similarity(
                [user_profile.values], 
                car_vectors[user_profile.index]  # Use only relevant features
            )
            
            top_indices = np.argsort(similarities[0])[::-1][:n]
            top_cars = car_vectors.iloc[top_indices]

                        # Generate explanation for each recommendation
            for idx, (car_id, similarity) in enumerate(zip(top_cars.index, similarities[0][top_indices])):
                car_features = top_cars.loc[car_id]
                top_features = user_profile[car_features != 0].nlargest(3)
                
                logger.info("Recommendation #%d: %s (Score: %.2f)\n""Top contributing features:\n%s",idx+1, car_id, similarity,"\n".join([f"- {feat}: {weight:.2f}" for feat, weight in top_features.items()]))
            
            return top_cars.index.tolist()
            
        except Exception as e:
            logger.error(f"Recommendation failed: {str(e)}")
            return []