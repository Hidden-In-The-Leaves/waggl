const express = require('express');
const accountSettingsController = require('../controllers/accountSettingsController');

const router = express.Router();

router.route('/userInfo')
  .get(accountSettingsController.getUserInfo);

router.route('/privacySettings')
  .get(accountSettingsController.getPrivacySettings);

router.route('/locationInfo')
  .get(accountSettingsController.getLocationInfo);

module.exports = router;
