const mongoose = require('mongoose')
const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  name_en: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  google_map: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    trim: true,
    required: true,
    min: 1,
    max: 5
  },
  description: {
    type: String,
    trim: true
  },
  time: {
    type: Date,
    default: Date.now
  }
})

const Restaurant = mongoose.model('Restaurant', RestaurantSchema)

module.exports = Restaurant