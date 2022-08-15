const express = require('express');
const packsController = require('../controllers/packsController.js');

const router = express.Router();

router.route('/')
  .get(packsController.getAll)
  // .post('some controller')
  // .put('some controller')

router.route('/:userid')
  .get(packsController.getByUserId)

module.exports = router;