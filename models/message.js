const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
  title: String,
  content: String,
  type: String, 
  author: String,
  createTime: Date,  // yyyyMMdd hh:mm:ss
  receiver:[{
    type: Schema.Types.ObjectId,
    ref: 'msgState'
  }]
});

const msgStateSchema = new Schema({
  read: Number, //1 未读   2 已读    3 垃圾箱
  state: Number, // 1 有效 0 失效
  readTime: Date, // yyyyMMdd hh:mm:ss
  message: {
    type: Schema.Types.ObjectId,
    ref: 'message'
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: 'account'
  }
})

const account = mongoose.model('account', accountSchema)
module.exports = account
