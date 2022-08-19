const express = require('express');
const {
  getUsers,
  likeDog,
  getMatchList,
  deleteMatch,
  getDog,
} = require('../controllers/testController');

const router = express.Router();

router.route('/').get(getUsers);
router.route('/like').post(likeDog).get(getMatchList);
router.route('/match').post(deleteMatch);
router.route('/dog').get(getDog);
module.exports = router;
