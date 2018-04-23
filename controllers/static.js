const exportFormat = require('../middleware/exportFormat')
const Static = require('./../models/static')

module.exports = {
  // 获取资源
  getStaticList: async (req, res, next) => {
    const { page, limit } = req.query
    let skip = (page - 1) * limit
    const staticList = await Static.find({ state: 1 }, null, {
      skip: parseInt(skip),
      limit: parseInt(limit)
    }).populate('account')
    const staticLength = await Static.count({ state: 1 })
    res.status(200).json(exportFormat.list(staticList, staticLength))
  },
  // 删除资源
  deleteStatic: async (req, res, next) => {
    const staticId = req.body.staticId
    const nstatic = await Static.findByIdAndUpdate(staticId, { state: 0 })
    res.status(200).json(exportFormat.normal('', '删除成功'))
  }
}
