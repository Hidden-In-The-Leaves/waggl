const express = require('express');
// const packsController = require('../controllers/packsController');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/signUp')
  // .get(packsController.getPacks)
  .post(userController.createUser);

router.route('/login')
  .get(userController.getUserByEmail);
// .post(packsController.createPack);

module.exports = router;
