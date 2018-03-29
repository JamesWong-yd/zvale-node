const mongoose = require('mongoose')
const Schema = mongoose.Schema

const accountSchema = new Schema({
  account: String,
  name: String, 
  pwd: String,
  phone: Number,
  email: String,
  state: Number,
  permission:[{
    type: Schema.Types.ObjectId,
    ref: 'permission'
  }]
});

const account = mongoose.model('account', accountSchema)
module.exports = account
