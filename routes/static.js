const router = require('express-promise-router')();

const staticControllers = require('../controllers/static')

router.route('/')
 .get(staticControllers.getStaticList)

router.route('/delete')
 .post(staticControllers.deleteStatic)

module.exports = router