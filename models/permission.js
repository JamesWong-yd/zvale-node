const mongoose = require('mongoose')
const Schema = mongoose.Schema

const permissionSchema = new Schema({
  model: Number,
  account: Number,
  state: Number
})

const permission = mongoose.model('permission', permissionSchema);
module.exports = permission