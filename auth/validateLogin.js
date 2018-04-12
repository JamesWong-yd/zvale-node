const jwtAes = require('./jwtAes')
const accountController = require('../controllers/account')

module.exports = {
  authorVali: async (req, res, next) => {
    if (req.headers.authorization) {
      let token = req.headers.authorization
      // 解密;
      let info = jwtAes.decoded(token)
      // 验证时间
      if (info.exp && info.exp < new Date()) {
        return res.status(401).json({
          status: false,
          msg: '用户信息已超时，请重新登陆'
        })
      }
      // 验证用户信息及验证用户状态
      const accuntState = await accountController.validateAccount({_id: info.cid,pwd: info.pwd})
      if(!accuntState || !accuntState[0].state){
        return res.status(401).json({
          status: false,
          msg: '用户信息授权失败，请重新登录'
        })
      }
      // 取值赋值
      req.headers.uid = info.cid
      next()
    } else {
      res.status(401).json({
        status: false,
        msg: '用户未登录'
      })
    }
  }
}