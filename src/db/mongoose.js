const mongoose = require('mongoose')

// connect to mongodb with mongoose
mongoose.connect('mongodb://127.0.0.1:27017/restaurant', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})