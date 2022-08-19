const express = require('express');
const {
  getUsers,
  likeDog,
  getMatchList,
  deleteMatch,
} = require('../controllers/testController');

const router = express.Router();

router.route('/').get(getUsers);
router.route('/like').post(likeDog).get(getMatchList);
router.route('/match').post(deleteMatch);
module.exports = router;
