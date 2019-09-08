const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

// search a todos
router.get('/', async (req, res) => {
  try {
    res.redirect('/')
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router