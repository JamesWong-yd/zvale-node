const { log } = require('../models/log')

// 类型
const otype = {
  login: '登陆',
  create: '创建',
  edit: '修改',
  delete: '删除',
  bind: '绑定',
  unbind: '解除绑定',
  issue: '发布',
  agree: '同意',
  refuse: '拒绝'
}

module.exports = {
  write: async function (content) {
    
    // 默认
    let defaultContent = {
      title: content.title || '',
      author: content.author || '',
      type: otype[content.type] || '创建',
      content: content.content || ''
    }
    const newlog = new log(defaultContent)
    const res = await newlog.save()
    return true
  }
} 
