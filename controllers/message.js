const exportFormat = require('../middleware/exportFormat')
const Account = require('../models/account')
const { message, msgState } = require('../models/message')

module.exports = {
  // 获取信息列表
  getMessageList: async (req, res, next) => {
    const { title = '', sendDateStart = '', sendDateEnd = '', page, limit } = req.query
    let skip = (page - 1) * limit
    let search = { title: { $regex: title }, sendDate: { $gte: ISODate(sendDateStart), $lt: ISODate(sendDateEnd) } }
    const messageListLength = await message.count(search)
    const messageList = await message.find(search, null, {
      skip: parseInt(skip),
      limit: parseInt(limit)
    })
    res.status(200).json(exportFormat.list(messageList, messageListLength))
  },

  // 创建信息
  addMessage: async (req, res, next) => {
    let params = req.body
    // 假设
    params.author = '5abe4ae8ec6f6f17a07b5d32'
    params.receiver = params.receivers.split('##')
    const newMessage = new message(params)
    let nmessage = await newMessage.save()
    res.status(201).json(exportFormat.normal({
      messageId: nmessage._id
    }, '发送成功'))
  }
}