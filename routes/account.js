const router = require('express-promise-router')();

const accountController = require('../controllers/account');
const { validateParam, validateBody, schemas } = require('../helpers/routeHelper');

router.route('/')
  .get(accountController.getAccount)
  .post(validateBody(schemas.accountSchema), accountController.newAccount)

router.route('/edit')
  .post(accountController.editAccount)
  
router.route('/list')
  .get(accountController.getAccountList)

router.route('/validate')
  .get(accountController.accountOnly)

router.route('/updateState')
  .post(accountController.updateAccountState)

module.exports = router;
