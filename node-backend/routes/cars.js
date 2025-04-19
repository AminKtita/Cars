const express = require('express');
const Car = require('../models/Car');
const UserAction = require('../models/UserAction'); 

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



module.exports = router;