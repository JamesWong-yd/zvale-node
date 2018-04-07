const router = require('express-promise-router')();
const MessageController = require('../controllers/message')

router.route('/')
  // .get(MessageController.getMessage)
  .post(MessageController.addMessage)

router.route('/list')
  .get(MessageController.getMessageList)

  router.route('/myMessageCount')
  .get(MessageController.getAccountMessageCount)

router.route('/myMessage')
  .get(MessageController.getAccountMessage)

router.route('/remove')
  .post(MessageController.removeMessage)
module.exports = router