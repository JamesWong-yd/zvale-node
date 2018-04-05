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
  author: {
    type: Schema.Types.ObjectId,
    ref: 'account'
  },
  createTime: {
    type: Date,
    default: new Date()
  },  // yyyyMMdd hh:mm:ss
  removeTime: Date,
  receiver: [{
    type: Schema.Types.ObjectId,
    ref: 'account'
  }]
});

const msgStateSchema = new Schema({
  read: {
    type: Number,
    default: 1
  }, //1 未读   2 已读   3 垃圾箱
  state: {
    type: Number,
    default: 1,
  }, // 1有效 0无效
  messageId: {
    type: Schema.Types.ObjectId,
    ref: 'message'
  },
  accountId: {
    type: Schema.Types.ObjectId,
    ref: 'account'
  },
  readTime: {
    type: Date,
    default: ''
  } // yyyyMMdd hh:mm:ss
})

const message = mongoose.model('message', messageSchema)
const msgState = mongoose.model('msgState', msgStateSchema)

module.exports = {
  message,
  msgState
}
