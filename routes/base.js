const router = require('express-promise-router')();

const baseController = require('../controllers/base')

// 头部
router.route('/headermodel')
  .get(baseController.getHeader)
  .post(baseController.addHeader)

router.route('/headermodel/edit')
  .post(baseController.editHeader)

router.route('/headermodel/delete')
  .post(baseController.deleteHeader)

// 尾部
router.route('/footermodel')
  .get(baseController.getFooter)
  .post(baseController.addFooter)

router.route('/footermodel/edit')
  .post(baseController.editFooter)

router.route('/footermodel/delete')
  .post(baseController.deleteFooter)

// 基础模型
router.route('/basemodel')
  .get(baseController.getBase)
  .post(baseController.addBase)

module.exports = router
