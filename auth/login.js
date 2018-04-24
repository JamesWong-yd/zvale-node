const Account = require('../models/account')
const router = require('express-promise-router')()
const exportFormat = require('../middleware/exportFormat')
const md5 = require('md5')
const Log = require('../middleware/logwrite')
const jwtAes = require('./jwtAes')

async function login(req, res, next) {
  let search = {
    account: req.body.account,
    pwd: md5(req.body.pwd)
  }
  const account = await Account.find(search).populate('permission')
  if (account[0]) {
    const info = {
      cid: account[0]._id,
      pwd: account[0].pwd
    }
    const newAccount = {
      id: account[0]._id,
      name: account[0].name,
      account: account[0].account,
      permission: account[0].permission,
      state: account[0].state,
      token: jwtAes.encode(info)
    }
    // logw
    await Log.write({
      type: 'login',
      author: account[0]._id,
      title: '登陆系统',
      content: '登陆系统'
    })
    res.status(200).json(exportFormat.normal(newAccount, '登陆成功'))
  } else {
    res.status(200).json(exportFormat.not(false, '账号或密码错误！'))
  }
}

router.route('/').post(login)

module.exports = router
