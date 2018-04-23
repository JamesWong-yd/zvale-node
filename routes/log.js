const router = require('express-promise-router')();

const logControllers = require('../controllers/log')

router.route('/')
  .get(logControllers.getLogList)

module.exports = router
