const router = require('express-promise-router')();

const accountController = require('../controllers/account');

router.route('/')
  .get(accountController.getAccountList)
  .post(accountController.newAccount)

module.exports = router;
