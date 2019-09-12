const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

// import auth middleware
const { authenticated } = require('../../config/auth')

// restaurant homepage
router.get('/', authenticated, async (req, res) => {
  try {

    const restaurants = await Restaurant.find({ userId: req.user.id })
      .sort({ time: 'desc' })
      .exec()
    res.render('index', { restaurants })
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router