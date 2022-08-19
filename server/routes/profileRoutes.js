const express = require('express');
const profileControllers = require('../controllers/profilesController');

const router = express.Router();

router.route('/')
  .get(profileControllers.getProfiles)
  .post(profileControllers.createProfile);

router.route('/:dogid')
  .put(profileControllers.editProfile);

module.exports = router;
