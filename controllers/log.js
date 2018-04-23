const exportFormat = require('../middleware/exportFormat')
const Log = require('../models/log')

module.exports = {
  // 获取日志列表
  getLogList: async (req, res, next) => {
    const { type = '', content = '', page, limit } = req.query
    let skip = (page - 1) * limit
    let search = { content: { $regex: content }, type: type }
    const logLength = await Log.count(search)
    const logList = await Log.find(search, null, {
      skip: parseInt(skip),
      limit: parseInt(limit)
    }).populate('author', {
      name: 1,
      _id: 0
    })
    res.status(200).json(exportFormat.list(logList, logLength))
  }
}