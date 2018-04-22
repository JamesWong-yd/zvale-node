const exportFormat = require('../middleware/exportFormat')
const { header } = require('../models/base')

module.exports = {
  addHeader: async (req, res, next) => {
    const params = req.body
    const newHeader = new header(params)
    const nheader = await newHeader.save()
    res.status(201).json(exportFormat.normal({
      headerModalId: nheader._id
    }, '创建成功'))
  },

  getHeader: async (req, res, next) => {
    const { page, limit } = req.query
    let skip = (page - 1) * limit
    const headermodelList = await header.find({ state: 1 })
    const headermodelLength = await header.count({ state: 1 }, null, {
      skip: parseInt(skip),
      limit: parseInt(limit)
    })
    res.status(200).json(exportFormat.list(headermodelList, headermodelLength))
  }
}