const jwt = require('jwt-simple')
const aes256 = require('aes256')
const config = require('../baseconfig/config')
const cipher = aes256.createCipher(config.aesKey)

module.exports = {
  encode: function (info) {
    // 默认设置4小时有效时间
    if (!info.exp) {
      info.exp = 1000 * 60 * 60 * 24 + new Date() * 1
    }
    // 转换成字符转
    const encodeInfo = JSON.stringify(info)
    // aes 加密
    let aesInfo = cipher.encrypt(encodeInfo)
    // Jwt 生成token
    let token = jwt.encode(aesInfo, config.jwtKey)

    return token
  },
  decoded: function (token) {
    // jwt 获取信息
    let aesInfo = jwt.decode(token, config.jwtKey)
    // aes 解密
    let decodedInfo = cipher.decrypt(aesInfo)
    // 转换为json
    const info = JSON.parse(decodedInfo)

    return info
  }
}