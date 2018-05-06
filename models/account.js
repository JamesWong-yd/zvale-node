const mongoose = require('mongoose')
const Schema = mongoose.Schema

const accountSchema = new Schema({
  account: String,
  name: String,
  pwd: String,
  phone: Number,
  email: String,
  state: Number, // 1 有效 0 失效
  permission: [{
    type: Schema.Types.ObjectId,
    ref: 'permission'
  }],
  createTime: {
    type: Date,
    default: Date.now
  }
});

const account = mongoose.model('account', accountSchema)
module.exports = account
