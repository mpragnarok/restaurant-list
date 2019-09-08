const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

// restaurant homepage
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({}).sort({ rating: 'desc' }).exec()
    res.render('index', { restaurants })
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router