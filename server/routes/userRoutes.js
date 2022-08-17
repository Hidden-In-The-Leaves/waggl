const express = require('express');
// const packsController = require('../controllers/packsController');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/signUp')
  .post(userController.createUser);

router.route('/login')
  .get(userController.getUserByEmail);

router.route('/signUp/thirdParty')
  .post(userController.createUserByThridProvider);

router.route('/')
  .get(userController.getUsers);

module.exports = router;
