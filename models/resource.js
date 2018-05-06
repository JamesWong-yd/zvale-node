const mongoose = require('mongoose')
const Schema = mongoose.Schema

const staticSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'account'
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  filename: String,
  originalname: String,
  size: Number,
  mimetype: String,
  path: String,
  state: {
    type: Number,
    default: 1 // 有效， 无效
  }
});

const static = mongoose.model('resource', staticSchema)
module.exports = static
