const md5 = require('md5')
const exportFormat = require('../middleware/exportFormat')
const Account = require('../models/account')
const Permission = require('../models/permission')

module.exports = {
  // 获取账号列表
  getAccountList: async (req, res, next) => {
    const { account = "", name = "", page, limit } = req.query
    let skip = (page - 1) * limit
    let search = { account: { $regex: account }, name: { $regex: name } }
    const accountListLength = await Account.count(search)
    const accountList = await Account.find(search, { pwd: 0 }, { skip: parseInt(skip), limit: parseInt(limit) })
    res.status(200).json(exportFormat.list(accountList, accountListLength))
  },

  // 创建账号
  newAccount: async (req, res, next) => {
    const params = req.value.body
    const accountOnly = await Account.findOne({ account: params.account })
    if(accountOnly){
      res.status(200).json(exportFormat.normal({result:false},'创建失败，存在相同账号'))
    }else{
      params.pwd = md5(params.pwd)
      const newAccount = new Account(params)
      const account = await newAccount.save()
      res.status(201).json(exportFormat.normal(account, '创建成功'))
    }
  },

  // 检测唯一
  accountOnly: async (req, res, next) => {
    const account = req.query.account
    const accountOnly = await Account.findOne({ account: account })
    let flag = {}
    flag.result = accountOnly ? true : false
    let msg = accountOnly ? '已存在相同账号' : '可以使用账号'
    res.status(200).json(exportFormat.normal(flag, msg))
  },

  // 账号生失效
  updateAccountState: async (req, res, next) => {
    const { id, state } = req.body
    const account = await Account.findByIdAndUpdate(id, { state: state }, { new: true })
    res.status(200).json(exportFormat.normal(account, '更新成功'))
  }
}
