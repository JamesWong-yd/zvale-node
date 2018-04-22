const router = require('express-promise-router')();

const baseController = require('../controllers/base')

router.route('/headermodel')
  .get(baseController.getHeader)
  .post(baseController.addHeader)

module.exports = router
