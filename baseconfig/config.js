// 注意此文件禁止上传

// 数据库
let dbconfig = {
  host:'120.79.203.126',
  port: '9088',
  db: 'zvale',
  auth: 'zvale',
  pwd: 'zvale20180122.'
}

// token 算法密钥
let aesKey = 'huang.zvale'
let jwtKey = 'huang.zvale'

module.exports = {
  dbconfig: `mongodb://${dbconfig.auth}:${dbconfig.pwd}@${dbconfig.host}:${dbconfig.port}/${dbconfig.db}`,
  aesKey,
  jwtKey
}