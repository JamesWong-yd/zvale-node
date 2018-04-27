const mongoose = require('mongoose')
const Schema = mongoose.Schema

const navSchema = new Schema({
  path: String,
  type: String, // 顶部、底部、顶部和底部、无
  title: String,
  name: String,
  priority: Number,
  createTime: {
    type: Date,
    default: new Date()
  },
  state: String, // 1/0
  model: [{
    type: Schema.Types.ObjectId,
    ref: 'model'
  }]
})

const nav = mongoose.model('nav', navSchema)
module.exports = nav