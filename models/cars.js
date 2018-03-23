const mongoose = require('mongoose')
const Schema = mongoose.Schema

const carSchema = new Schema({
  make: String,
  model: String,
  year: Number,
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
})

const car = mongoose.model('cars',carSchema)
module.exports = car