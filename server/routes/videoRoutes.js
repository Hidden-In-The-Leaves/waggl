const express = require('express');
const videoController = require('../controllers/videoController');

const router = express.Router();

router.route('/token')
  .get(videoController.getToken);

module.exports = router;
