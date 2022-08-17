const express = require('express');
const accountSettingsController = require('../controllers/accountSettingsController');

const router = express.Router();

router.route('/userInfo')
  .get(accountSettingsController.getUserInfo)
  .put(accountSettingsController.putUserInfo);

router.route('/privacySettings')
  .get(accountSettingsController.getPrivacySettings)
  .put(accountSettingsController.putPrivacySettings);

router.route('/locationInfo')
  .get(accountSettingsController.getLocationInfo)
  .put(accountSettingsController.putLocationInfo);

module.exports = router;
