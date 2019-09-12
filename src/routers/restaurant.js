const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')
const { authenticated } = require('../../config/auth')


// fetch all restaurants
router.get('/', authenticated, async (req, res) => {
  try {
    const sortBy = req.query.sortBy || 'time'
    const order = req.query.order || 'desc'
    const keyword = req.query.keyword || ''
    const sortByEnum = ['time', 'rating', 'alphabet', 'category'].includes(sortBy)
    const orderEnum = ['asc', 'desc'].includes(order)
    let sort = {}

    // if sortBY and order query in enumList
    if (!sortByEnum || !orderEnum) {
      sort = { time: 'desc' }

    } else {
      sort[sortBy] = order
    }

    const restaurants = await Restaurant.find({ userId: req.user.id }).sort(sort).exec()
    const searchRestaurant = await restaurants.filter((restaurant) => restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) || restaurant.name.includes(keyword) || restaurant.category.includes(keyword))

    res.render('index', { restaurants: searchRestaurant, keyword, sortBy, sortByEnum })

  } catch (e) {
    res.status(500).send()
  }
})

// create a new restaurant data
router.post('/', authenticated, async (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description,
    userId: req.user._id
  })
  try {

    if (!restaurant) {
      return res.redirect('/')
    }
    await restaurant.save()
    res.status(201).redirect('/')
  } catch (e) {
    res.status(400).send(e)
  }
})


// create a new restaurant in page
router.get('/new', authenticated, async (req, res) => {
  try {
    res.render('new')
  } catch (e) {
    res.status(500).send()
  }
})

// fetch a restaurant by its id and show the detail
router.get('/:id', authenticated, async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
    if (!restaurant) {
      return res.status(404).send()
    }
    res.render('show', { restaurant })
  } catch (e) {
    res.status(500).send()
  }
})

// update a restaurant in page
router.get('/:id/edit', authenticated, async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ _id: req.params.id, userId: req.user._id })
    if (!restaurant) {
      res.status(404).send
    }
    res.render('edit', { restaurant })
  } catch (e) {
    res.status(500).send()
  }
})

// update a restaurant
router.put('/:id', authenticated, async (req, res) => {
  const updates = Object.keys(req.body)
  try {
    const restaurant = await Restaurant.findOne({ _id: req.params.id, userId: req.user._id })
    updates.forEach(update => restaurant[update] = req.body[update])
    await restaurant.save()
    res.redirect(`/restaurants/${req.params.id}`)
  } catch (e) {
    res.status(400).send()
  }
})

// delete a restaurant
router.delete('/:id', authenticated, async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ _id: req.params.id, userId: req.user._id })
    if (!restaurant) {
      return res.status(404).send()
    }
    restaurant.remove()
    res.redirect('/')
  } catch (e) {
    res.status(500).send()
  }
})



module.exports = router