const express = require('express');
const Car = require('../models/Car');
const UserAction = require('../models/UserAction'); 
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();

router.get('/most-viewed', async (req, res) => {
  try {
    // Get the most frequent carId from view actions
    const mostViewed = await UserAction.aggregate([
      { $match: { actionType: 'view' } },
      {
        $group: {
          _id: "$carId",
          viewCount: { $sum: 1 }
        }
      },
      { $sort: { viewCount: -1 } },
      { $limit: 1 }
    ]);

    if (mostViewed.length === 0) {
      return res.status(404).json({ message: "No views recorded yet" });
    }

    // Get car details
    const car = await Car.findById(mostViewed[0]._id);
    
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json({
      ...car.toObject(),
      viewCount: mostViewed[0].viewCount
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Create a new car
router.post('/', async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).send(car);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.send(cars);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a specific car by MongoDB _id
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).send('Car not found');
    res.send(car);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a car by MongoDB _id
router.put('/:id', async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!car) return res.status(404).send('Car not found');
    res.send(car);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a car by MongoDB _id
router.delete('/:id', async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).send('Car not found');
    res.send(car);
  } catch (error) {
    res.status(500).send(error);
  }
});

// most viewd by brand
router.get('/most-viewed-ids/:brand', async (req, res) => {
  try {
    console.log('UserAction model:', UserAction); // Should show model functions
    console.log('Brand received:', req.params.brand);

    const brand = decodeURIComponent(req.params.brand);
    console.log('Decoded brand:', brand);

    const results = await UserAction.aggregate([
      { $match: { actionType: 'view' } },
      {
        $group: {
          _id: "$carId",
          viewCount: { $sum: 1 }
        }
      },
      { $sort: { viewCount: -1 } },
      {
        $lookup: {
          from: "carspider",
          localField: "_id",
          foreignField: "_id",
          as: "carDetails"
        }
      },
      { $unwind: "$carDetails" },
      { $match: { "carDetails.brand_name": new RegExp(brand, 'i') } },
      { $limit: 2 },
      { $project: { carId: "$_id", _id: 0 } }
    ]);
    console.log('Aggregation results:', results);

    const carIds = results.map(r => r.carId);
    res.json(carIds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get reviews for a car
router.get('/:id/reviews', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
      .populate('reviews.user', 'username profileImage') 
      .select('reviews');
    res.json(car.reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a review (protected route)
router.post('/:id/reviews', authMiddleware, async (req, res) => {
  try {
;
    const { comfort, performance, interiorDesign, speed, comment } = req.body;
    const ratings = [
      Number(comfort),
      Number(performance),
      Number(interiorDesign),
      Number(speed)
    ];
    
    if (!ratings.every(r => r >= 1 && r <= 5)) {
      console.log('\n=== VALIDATION FAILED ===');
      return res.status(400).json({ error: "All ratings must be between 1-5" });
    }

    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ error: "Car not found" });

    const newReview = {
      user: req.userId,
      comfort: Number(comfort),
      performance: Number(performance),
      interiorDesign: Number(interiorDesign),
      speed: Number(speed),
      comment: String(comment).trim()
    };

    car.reviews.push(newReview);
    await car.save();

    // Return the full reviews array
    const updatedCar = await Car.findById(req.params.id)
      .populate({
        path: 'reviews.user',
        model: 'User',
        select: 'username profileImage'
      })
      .select('reviews');
    
    res.status(201).json(updatedCar.reviews);
    console.log('Received body:', req.body);
  console.log('Parsed ratings:', [comfort, performance, interiorDesign, speed]);

    
  } catch (error) {
    console.error('Review error:', error);
    res.status(500).json({
      error: error.message,
      stack: error.stack,
      receivedData: req.body
    });
  }
});

// Add to your car routes file (after existing routes)
router.get('/reviews/top', async (req, res) => {
  try {
    const topReviews = await Car.aggregate([
      // Step 1: Filter cars that have reviews
      { $match: { reviews: { $exists: true, $not: { $size: 0 } } } },
      
      // Step 2: Unwind the reviews array to treat each review as a separate document
      { $unwind: "$reviews" },
      
      // Step 3: Add computed fields
      {
        $addFields: {
          "reviews.averageRating": {
            $avg: [
              "$reviews.comfort",
              "$reviews.performance",
              "$reviews.interiorDesign",
              "$reviews.speed"
            ]
          },
          "reviews.carTitle": "$vehicle_title",
          "reviews.carBrand": "$brand_name"
        }
      },
      
      // Step 4: Sort by average rating (descending) and date (descending)
      {
        $sort: {
          "reviews.averageRating": -1,
          "reviews.createdAt": -1
        }
      },
      
      // Step 5: Limit to top 3 reviews
      { $limit: 3 },
      
      // Step 6: Lookup user details
      {
        $lookup: {
          from: "users",
          localField: "reviews.user",
          foreignField: "_id",
          as: "reviews.userDetails"
        }
      },
      
      // Step 7: Unwind user details array
      { $unwind: "$reviews.userDetails" },
      
      // Step 8: Project final format
      {
        $project: {
          _id: "$reviews._id",
          comment: "$reviews.comment",
          ratings: {
            comfort: "$reviews.comfort",
            performance: "$reviews.performance",
            interiorDesign: "$reviews.interiorDesign",
            speed: "$reviews.speed"
          },
          averageRating: "$reviews.averageRating",
          createdAt: "$reviews.createdAt",
          user: {
            username: "$reviews.userDetails.username",
            profileImage: "$reviews.userDetails.profileImage"
          },
          car: {
            title: "$reviews.carTitle",
            brand: "$reviews.carBrand",
            id: "$_id"
          }
        }
      }
    ]);

    res.json(topReviews);
  } catch (error) {
    console.error('Error fetching top reviews:', error);
    res.status(500).json({ error: 'Failed to fetch top reviews' });
  }
});
module.exports = router;