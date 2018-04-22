const router = require('express-promise-router')()
const path = require('path')
const multer = require('multer')
const Static = require('../models/static')
const exportFormat = require('../middleware/exportFormat')

// 实例
const storage = multer.diskStorage({
  //设置上传后文件路径，uploads文件夹会自动创建。
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  //给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, Date.now() + '' + Math.floor(Math.random() * 1000) + "." + fileFormat[fileFormat.length - 1]);
  }
});
//添加配置文件到muler对象。
const uploads = multer({
  storage: storage
});

const uploadController = async function (req, res) {
  const saveFile = {
    account: req.headers.uid,
    filename: req.file.filename,
    originalname: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype,
    path: '/static/' + req.file.filename
  }
  const newStatic = new Static(saveFile)
  const nStatic = await newStatic.save()
  res.status(201).json(exportFormat.normal({
    path: nStatic.path
  }, '上传成功'))
}

router.post('/', uploads.single('file'), uploadController);

module.exports = router;
