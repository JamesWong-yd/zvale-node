const router = require('express-promise-router')();
const MessageController = require('../controllers/message')

router.route('/')
  .get(MessageController.getMessageList)
  .post(MessageController.addMessage)

router.route('/remove')
  .post(MessageController.removeMessage)
module.exports = router