const md5 = require('md5')
const exportFormat = require('../middleware/exportFormat')
const Account = require('../models/account')
const Permission = require('../models/permission')

module.exports = {
  // 获取账号列表(含状态查找)
  getAccountList: async (req, res, next) => {
    const {
      account = "", name = "", state, page, limit
    } = req.query
    let skip = (page - 1) * limit
    let search = { account: { $regex: account , $ne: 'admin'}, name: { $regex: name } }
    if (state) {
      search.state = state
    }
    const accountListLength = await Account.count(search)
    const accountList = await Account.find(search, {
      pwd: 0
    }, {
        skip: parseInt(skip),
        limit: parseInt(limit)
      })
    res.status(200).json(exportFormat.list(accountList, accountListLength))
  },

  // 获取账号
  getAccount: async (req, res, next) => {
    const accountId = req.query.accountId
    const account = await Account.findById(accountId, {
      pwd: 0,
      _id: 0
    })
    res.status(200).json(exportFormat.normal(account))
  },

  // 验证账号
  validateAccount: async (params) => {
    if (!params._id || !params.pwd) return false
    let search = {
      _id: params._id,
      pwd: params.pwd
    }
    const res = await Account.find(search)
    return res
  },

  // 创建账号
  newAccount: async (req, res, next) => {
    const params = req.value.body
    const accountOnly = await Account.findOne({
      account: params.account
    })
    if (accountOnly) {
      res.status(200).json(exportFormat.normal({
        result: false
      }, '创建失败，存在相同账号'))
    } else {
      params.pwd = md5(params.pwd)
      const newAccount = new Account(params)
      let account = await newAccount.save()
      res.status(201).json(exportFormat.normal({
        accountId: account._id
      }, '创建成功'))
    }
  },

  // 修改账号
  editAccount: async (req, res, next) => {
    const params = req.body
    const accountOnly = await Account.findOne({
      account: params.account
    })
    if (accountOnly && accountOnly._id === params.accountId) {
      res.status(200).json(exportFormat.normal({
        result: false
      }, '修改失败，存在相同账号'))
    } else {
      if (params.pwd) params.pwd = md5(params.pwd)
      const accountId = params.accountId
      let updatedAccount = params
      const account = await Account.findByIdAndUpdate(accountId, updatedAccount, {
        fields: {
          pwd: 0
        },
        new: true
      })
      res.status(200).json(exportFormat.normal(account, '修改成功'))
    }
  },

  // 检测唯一
  accountOnly: async (req, res, next) => {
    const account = req.query.account
    const accountOnly = await Account.findOne({
      account: account
    })
    let flag = {}
    flag.result = accountOnly ? true : false
    let msg = accountOnly ? '已存在相同账号' : '可以使用账号'
    res.status(200).json(exportFormat.normal(flag, msg))
  },

  // 账号生失效
  updateAccountState: async (req, res, next) => {
    const {
      id,
      state
    } = req.body
    const account = await Account.findByIdAndUpdate(id, {
      state: state
    }, {
        fields: {
          pwd: 0
        },
        new: true
      })
    res.status(200).json(exportFormat.normal(account, '更新成功'))
  }
}