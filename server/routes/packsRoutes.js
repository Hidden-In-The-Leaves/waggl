const express = require('express');
const packsController = require('../controllers/packsController.js');

const router = express.Router();

router.route('/')
  .get(packsController.getAll)
  .post(packsController.createPack)

router.route('/:id')
  .put(packsController.updatePack)
  .delete(packsController.deletePack)

router.route('/user/:userid')
  .get(packsController.getByUserId)

module.exports = router;