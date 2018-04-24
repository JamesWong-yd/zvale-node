const exportFormat = require('../middleware/exportFormat')
const log = require('../models/log')

module.exports = {
  // 获取日志列表
  getLogList: async (req, res, next) => {
    const {
      type = '', content = '', page, limit
    } = req.query
    let skip = (page - 1) * limit
    let search = {
      content: {
        $regex: content
      }
    }
    if (type) {
      search.type = type
    }
    console.log(search)
    const logLength = await log.count(search)
    const logList = await log.find(search, null, {
      skip: parseInt(skip),
      limit: parseInt(limit),
      sort: {createTime: -1}
    }).populate('author', {
      name: 1,
      _id: 0
    })
    res.status(200).json(exportFormat.list(logList, logLength))
  }
}