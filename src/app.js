const express = require('express')
require('./db/mongoose')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const port = process.env.PORT || 3000
const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'main'
})


// setup handlebars engine and file extension

app.engine(hbs.extname, hbs.engine, hbs.defaultLayout)
app.set('view engine', hbs.extname)

// import body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// setup method-override
app.use(methodOverride('_method'))

// static files
app.use(express.static("public"))

// use route
app.use('/restaurants', require('./routers/restaurant'))
app.use('/search', require('./routers/search'))
app.use('/', require('./routers/home'))

// // route setting
// app.get('/', (req, res) => {
//   const restaurant = restaurantData.results
//   res.render('index', { restaurant })
// })

// app.get('/restaurants/:id', (req, res) => {
//   const bistro = restaurantData.results.find((bistro) => req.params.id === bistro.id.toString())
//   res.render('show', { bistro })
// })

// app.get('/search', (req, res) => {
//   const keyword = req.query.keyword
//   const searchRestaurant = restaurantData.results.filter((restaurant) => restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) || restaurant.name.includes(keyword) || restaurant.category.includes(keyword))
//   res.render('index', { restaurant: searchRestaurant, keyword })
// })

// set up listening on Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost ${port}`)
})