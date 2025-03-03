const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  vehicleTitle: { type: String, alias: 'vehicle_title' },
  price: String,
  carRefId: { type: Number, alias: 'car_ref_id' },
  powerCv: { type: Number, alias: 'power_cv' },
  mileage: String,
  powerCvFiscal: { type: Number, alias: 'power_cv_fiscal' },
  numberOfCylinders: { type: Number, alias: 'number_of_cylinder' },
  year: String,
  fuelType: { type: String, alias: 'fuel_type' },
  gearboxType: { type: String, alias: 'gearbox_type' },
  modelName: { type: String, alias: 'model_name' },
  brandName: { type: String, alias: 'brand_name' },
  color: String,
  country: String,
  images: [String],
});

module.exports = mongoose.model('Car', carSchema, 'carspider');