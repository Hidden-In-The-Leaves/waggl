const express = require('express');
const accountSettingsController = require('../controllers/accountSettingsController');

const router = express.Router();

router.route('/userInfo/:id')
  .get(accountSettingsController.getUserInfo)
  .put(accountSettingsController.putUserInfo);

router.route('/privacySettings/:id')
  .get(accountSettingsController.getPrivacySettings)
  .put(accountSettingsController.putPrivacySettings);

router.route('/locationInfo/:id')
  .get(accountSettingsController.getLocationInfo)
  .put(accountSettingsController.putLocationInfo);

module.exports = router;
