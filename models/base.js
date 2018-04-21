const mongoose = require('mongoose')
const Schema = mongoose.Schema

const baseSchema = new Schema({
  author: {type: Schema.Types.ObjectId, ref: 'account' },
  creatTime: { type: Date, default: new Date() },
  state: { type: Number, default: 1 },// 1有效、0无效
  title: String,
  keywords: String,
  description: String,
  registerNo: String,
  company: String,
  headerType: String,
  footerType: String,
  header: {
    type: Schema.Types.ObjectId,
    ref: 'header'
  },
  footer: {
    type: Schema.Types.ObjectId,
    ref: 'footer'
  }
});

const headerSchema = new Schema({
  name: String,
  description: String,
  creatTime: {
    type: Date,
    default: new Date()
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'account'
  },
  background: String,
  logoType: String,
  logoContent: String,
  nav: {
    type: Schema.Types.ObjectId,
    ref: 'nav'
  },
  color: String,
  activeNavType: String,
  activeNavColor: String,
  activeNavOthercolor: String
})

const footerSchema = new Schema({
  name: String,
  description: String,
  creatTime: {
    type: Date,
    default: new Date()
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'account'
  }
})

const base = mongoose.model('base', baseSchema)
const header = mongoose.model('header', headerSchema)
const footer = mongoose.model('footer', footerSchema)

module.exports = {
  base,
  header,
  footer
}
