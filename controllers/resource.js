const exportFormat = require('../middleware/exportFormat')
const Static = require('./../models/resource')
const Log = require('../middleware/logwrite')

module.exports = {
  // 获取资源
  getStaticList: async (req, res, next) => {
    const { mimetype = '', originalname = '', page, limit } = req.query
    let skip = (page - 1) * limit
    let search = {
      originalname: {
        $regex: originalname
      },
      state: 1
    }
    if (mimetype) {
      search.mimetype = mimetype
    }
    const staticList = await Static.find(search, null, {
      skip: parseInt(skip),
      limit: parseInt(limit),
      sort: { createTime: -1 }
    }).populate('author', { pwd: 0 })
    const staticLength = await Static.count(search)
    res.status(200).json(exportFormat.list(staticList, staticLength))
  },
  // 删除资源
  deleteStatic: async (req, res, next) => {
    const staticId = req.body.staticId
    const nstatic = await Static.findByIdAndUpdate(staticId, { state: 0 })
    // logw
    await Log.write({
      type: 'delete',
      author: req.headers.uid,
      title: '删除资源',
      content: '删除资源：' + nstatic.originalname
    })
    res.status(200).json(exportFormat.normal('', '删除成功'))
  }
}
