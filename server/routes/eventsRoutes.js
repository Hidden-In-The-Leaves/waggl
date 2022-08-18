const express = require('express');
const eventsController = require('../controllers/eventsController');

const router = express.Router();

router.route('/')
  .get(eventsController.getEvents);

router.route('/packs')
  .get(eventsController.getPackEvents);

router.route('/event')
  .get(eventsController.getEventInfo);

router.route('/attendees')
  .get(eventsController.getAttendees);

router.route('/messages')
  .get(eventsController.getMessages)
  .post(eventsController.postMessage);

router.route('/')
  .post(eventsController.postEvent);

module.exports = router;
