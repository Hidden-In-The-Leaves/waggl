const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

// provides session id and user id and store that in session table.
router.route('/')
  .get(sessionController.checkCookie)
  .post(sessionController.storeCookie)
  .delete(sessionController.deleteCookie);

module.exports = router;