const mongoose = require('mongoose')
const Schema = mongoose.Schema
const RestaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  nameEn: {
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
  googleMap: {
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
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

const Restaurant = mongoose.model('Restaurant', RestaurantSchema)

module.exports = Restaurant