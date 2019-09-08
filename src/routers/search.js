const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

// search a restaurant
router.get('/', async (req, res) => {
  try {
    const sortBy = req.query.sortBy || 'time'
    const order = req.query.order || 'desc'
    let sort = {}
    sort[sortBy] = order

    const restaurants = await Restaurant.find().sort(sort).exec()
    const keyword = req.query.keyword

    const searchRestaurant = await restaurants.filter((restaurant) => restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) || restaurant.name.includes(keyword) || restaurant.category.includes(keyword))

    res.render('index', { restaurants: searchRestaurant, keyword, sortBy })
  } catch (e) {
    res.status(500).send()
  }
})


module.exports = router