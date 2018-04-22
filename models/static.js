const mongoose = require('mongoose')
const Schema = mongoose.Schema

const staticSchema = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: 'account'
  },
  createTime: {
    type: Date,
    default: new Date()
  },
  filename: String,
  originalname: String,
  size: Number,
  mimetype: String,
  path: String,
  State: {
    type: Number,
    default: 1 // 有效， 无效
  }
});

const static = mongoose.model('static', staticSchema)
module.exports = static
