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
    const accountList = await Account.find(search, null, { skip: parseInt(skip), limit: parseInt(limit) })
    res.status(200).json(exportFormat.list(accountList, accountListLength))
  },

  // 创建账号
  newAccount: async (req, res, next) => {
    // console.log(req.body)
    const newAccount = new Account(req.body)
    const account = await newAccount.save()
    res.status(201).json(exportFormat.normal(account))
  }
}
