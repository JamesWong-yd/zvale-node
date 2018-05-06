const mongoose = require('mongoose')
const Schema = mongoose.Schema

const logSchema = new Schema({
  title: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'account'
  },
  content: String,
  type: String, // 修改、创建、删除、绑定
  createTime: {
    type: Date,
    default: Date.now
  }
})

const log = mongoose.model('log', logSchema)

module.exports = { log }