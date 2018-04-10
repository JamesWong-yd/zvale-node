const exportFormat = require('../middleware/exportFormat')
const Account = require('../models/account')
const {
  message,
  msgState
} = require('../models/message')

module.exports = {
  // 获取信息列表
  getMessageList: async (req, res, next) => {
    const {
      title = '', sendDateStart = '', sendDateEnd = '', page, limit
    } = req.query
    let skip = (page - 1) * limit
    let search = {
      title: {
        $regex: title
      }
    }
    if (sendDateStart && sendDateEnd) {
      search.sendDate = {
        $gte: sendDateStart,
        $lt: sendDateEnd
      }
    }
    const messageListLength = await message.count(search)
    const messageList = await message.find(search, null, {
      skip: parseInt(skip),
      limit: parseInt(limit)
    }).populate('author', {
      name: 1,
      _id: 0
    })
    res.status(200).json(exportFormat.list(messageList, messageListLength))
  },

  // 根据msgId获取信息内容
  getMessage: async (req, res, next) =>{
    const messageId = req.query.messageId
    const nmessage = await message.findById(messageId).populate('receiver')
    res.status(200).json(exportFormat.normal(nmessage, '获取成功'))
  },

  // 根据用户id获取信息数量
  getAccountMessageCount: async (req, res, next) =>{
    // const accountId = req.query.accountId
    const accountId = '5ac3ab9004ef192988dd4bc9'
    const messageCount = await msgState.count({ accountId: accountId ,state : 1})
    res.status(200).json(exportFormat.normal({
      count: messageCount
    }, '获取成功'))
  },

  // 根据用户id获取信息列表
  getAccountMessage: async (req, res, next) => {
    const accountId = '5ac3ab9004ef192988dd4bc9'
    // const accountId = req.query.accountId
    const messageList = await msgState.find({ accountId: accountId ,state : 1}).populate({
      path: 'messageId'
    })
    res.status(200).json(exportFormat.list(messageList, messageList.length))
  },

  // 创建信息
  addMessage: async (req, res, next) => {
    let self = this
    let params = req.body
    // 假设
    params.author = '5abe4ae8ec6f6f17a07b5d32'
    params.receiver = params.receivers.split('##')
    const newMessage = new message(params)
    let nmessage = await newMessage.save()
    const receiverLength = params.receiver.length
    let receiverArr = []
    for (var i = 0; i < receiverLength; i++) {
      let newMsgState = {
        messageId: nmessage._id,
        accountId: params.receiver[i]
      }
      receiverArr.push(newMsgState)
    }
    await msgState.insertMany(receiverArr)
    res.status(201).json(exportFormat.normal({
      messageId: nmessage._id
    }, '发送成功'))
  },

  // 删除信息(状态为0)
  removeMessage: async (req, res, next) => {
    const { id } = req.body
    const nmessage = await message.findByIdAndUpdate(id, {
      state: 0
    }, {
        new: true
    })
    const newState = await msgState.update({messageId:id},{state: 0},{multi: true})
    res.status(200).json(exportFormat.normal(newState, '更新成功'))
  }
}