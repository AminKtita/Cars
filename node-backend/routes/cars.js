const express = require('express');
const Car = require('../models/Car');

const router = express.Router();

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

module.exports = router;