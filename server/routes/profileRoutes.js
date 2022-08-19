const express = require('express');
const profileControllers = require('../controllers/profilesController');

const router = express.Router();

router.route('/')
  .post(profileControllers.createProfile);

router.route('/:dogid')
  .put(profileControllers.editProfile);

router.route('/dogs')
  .get(profileControllers.getProfiles);

module.exports = router;
