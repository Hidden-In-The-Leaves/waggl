const express = require('express');
const {
  getUsers,
  likeDog,
  getMatchList,
} = require('../controllers/testController');

const router = express.Router();

router.route('/').get(getUsers);
router.route('/like').post(likeDog).get(getMatchList);
module.exports = router;
