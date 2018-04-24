const exportFormat = require('../middleware/exportFormat')
const { header, footer, base } = require('../models/base')
const Log = require('../middleware/logwrite')

module.exports = {
  // 创建头部
  addHeader: async (req, res, next) => {
    const params = req.body
    const newHeader = new header(params)
    const nheader = await newHeader.save()
    // logw
    await Log.write({
      type: 'create',
      author: req.headers.uid,
      title: '创建头部模型',
      content: '创建头部模型：' + nheader.name
    })
    res.status(201).json(exportFormat.normal({
      headerModalId: nheader._id
    }, '创建成功'))
  },

  // 获取头部列表
  getHeader: async (req, res, next) => {
    const { page, limit } = req.query
    let skip = (page - 1) * limit
    const headermodelList = await header.find({ state: 1 }, null, {
      skip: parseInt(skip),
      limit: parseInt(limit),
      sort: {createTime: -1}
    })
    const headermodelLength = await header.count({ state: 1 })
    res.status(200).json(exportFormat.list(headermodelList, headermodelLength))
  },

  // 修改头部
  editHeader: async (req, res, next) => {
    const params = req.body
    const headerId = params.headerId
    const nheader = await header.findByIdAndUpdate(headerId, params, { new: true })
    // logw
    await Log.write({
      type: 'edit',
      author: req.headers.uid,
      title: '修改头部模型',
      content: '修改头部模型：' + nheader.name
    })
    res.status(200).json(exportFormat.normal(nheader, '修改成功'))
  },

  // 删除头部
  deleteHeader: async (req, res, next) => {
    const headerId = req.body.headerId
    const nheader = await header.findByIdAndUpdate(headerId, { state: 0 })
    // logw
    await Log.write({
      type: 'delete',
      author: req.headers.uid,
      title: '删除头部模型',
      content: '删除头部模型：' + nheader.name
    })
    res.status(200).json(exportFormat.normal('', '删除成功'))
  },

  // 创建尾部
  addFooter: async (req, res, next) => {
    const params = req.body
    const newFooter = new footer(params)
    const nfooter = await newFooter.save()
    await Log.write({
      type: 'create',
      author: req.headers.uid,
      title: '创建尾部模型',
      content: '创建尾部模型：' + nfooter.name
    })
    res.status(201).json(exportFormat.normal(nfooter, '创建成功'))
  },

  // 获取尾部列表
  getFooter: async (req, res, next) => {
    const { page, limit } = req.query
    let skip = (page - 1) * limit
    const footermodelList = await footer.find({ state: 1 }, null, {
      skip: parseInt(skip),
      limit: parseInt(limit)
    })
    const footermodelLength = await footer.count({ state: 1 })
    res.status(200).json(exportFormat.list(footermodelList, footermodelLength))
  },

  // 更新尾部
  editFooter: async (req, res, next) => {




    await Log.write({
      type: 'edit',
      author: req.headers.uid,
      title: '修改尾部模型',
      content: '修改尾部模型：' + nfooter.name
    })
    res.status(200).json(exportFormat.normal('', '修改成功'))
  },

  // 删除尾部
  deleteFooter: async (req, res, next) => {


    await Log.write({
      type: 'delete',
      author: req.headers.uid,
      title: '删除尾部模型',
      content: '删除尾部模型：' + nfooter.name
    })
    res.status(200).json(exportFormat.normal('', '删除成功'))
  },

  // 基础模型关联
  addBase: async (req, res, next) => {


    res.status(200).json(exportFormat.normal('', '保存成功'))
  },

  // 基本参数
  getBase: async (req, res, next) => {
    const nbase = await base.find({ state: 1 }).populate(['header', 'footer'])
    res.status(200).json(exportFormat.normal(nbase, '获取成功'))
  }
}