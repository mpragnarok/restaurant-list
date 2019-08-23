// require package and resources
const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000 || process.env.PORT
const restaurantData = require('../restaurant.json')

// define path for Express config
const viewsPath = path.join(__dirname, '../views/layouts')
const partialsPath = path.join(__dirname, '../views')

// setup handlebars engine and to use .hbs as file extension 
app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: viewsPath,
    partialsDir: partialsPath
}))
app.set('view engine', '.hbs')

// setting static files
app.use(express.static('public'))

// route setting
app.get('/', (req, res) => {
    const restaurant = restaurantData.results
    res.render('index', { restaurant })
})

app.get('/restaurants/:id', (req, res) => {
    const bistro = restaurantData.results.find((bistro) => req.params.id === bistro.id.toString())
    res.render('show', { bistro })
})

app.get('/search', (req, res) => {
    const keyword = req.query.keyword
    const searchRestaurant = restaurantData.results.filter((restaurant) => restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) || restaurant.name.includes(keyword) || restaurant.category.includes(keyword))
    res.render('index', { restaurant: searchRestaurant, keyword })
})

// set up listening on Express server
app.listen(port, () => {
    console.log(`Express is listening on localhost ${port}`)
})