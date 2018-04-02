const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
  title: String,
  content: String,
  type: String,
  sendDate: {
    type: Date,
    default: new Date()
  },
  state: Number, // 1 有效 0 失效
  author: {
    type: Schema.Types.ObjectId,
    ref: 'account'
  },
  createTime: {
    type: Date,
    default: new Date()
  },  // yyyyMMdd hh:mm:ss
  receiver: [{
    type: Schema.Types.ObjectId,
    ref: 'msgState'
  }]
});

const msgStateSchema = new Schema({
  read: Number, //1 未读   2 已读   3 垃圾箱
  readTime: Number, // yyyyMMdd hh:mm:ss
  message: {
    type: Schema.Types.ObjectId,
    ref: 'message'
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: 'account'
  }
})

const message = mongoose.model('message', messageSchema)
const msgState = mongoose.model('msgState', msgStateSchema)

module.exports = {
  message,
  msgState
}
