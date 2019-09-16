const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const User = require('../user')
const { users } = require('./user.json')
const { restaurants } = require('./restaurant.json')


mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/restaurant', { useNewUrlParser: true, useCreateIndex: true })

const db = mongoose.connection
db.on('error', async () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db connected!')

  users.forEach((user, index) => {
    const newUser = new User({
      email: user.email,
      password: user.password
    })
    newUser.save()

    restaurants.splice(-3).forEach((restaurant) => {
      Restaurant.create({
        name: restaurant.name,
        name_en: restaurant.name_en,
        category: restaurant.category,
        image: restaurant.image,
        location: restaurant.location,
        phone: restaurant.phone,
        google_map: restaurant.google_map,
        rating: restaurant.rating,
        description: restaurant.description,
        userId: newUser._id
      })

    })
  })

  console.log('done')
})