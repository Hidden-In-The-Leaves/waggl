const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.route('/:userid')
  .get(usersController.getUserDetails);

module.exports = router;