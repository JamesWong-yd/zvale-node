const exportFormat = require('../middleware/exportFormat')
const Account = require('../models/account')
const {
  message,
  msgState
} = require('../models/message')
const Log = require('../middleware/logwrite')

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
        $lt: sendDateEnd,
        sort: { createTime: -1 }
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
    const accountId = req.headers.uid
    const messageCount = await msgState.count({ accountId: accountId ,state : 1})
    res.status(200).json(exportFormat.normal({
      count: messageCount
    }, '获取成功'))
  },

  // 根据用户id获取信息列表
  getAccountMessage: async (req, res, next) => {
    const accountId = req.headers.uid
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
    params.author = req.headers.uid
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
    // logw
    await Log.write({
      type: 'create',
      author: req.headers.uid,
      title: '发送信息',
      content: '发送信息：'+ nmessage.title
    })
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
    // logw
    await Log.write({
      type: 'delete',
      author: req.headers.uid,
      title: '删除信息',
      content: '删除信息：'+ nmessage.title
    })
    res.status(200).json(exportFormat.normal(newState, '删除成功'))
  }
}