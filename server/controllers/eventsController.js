/* eslint-disable no-console */
const db = require('../../database/postgres');

module.exports = {
  getEvents: ({ query }, res) => {
    db.query(`
      SELECT e.id, e.event_name, e.description, p.pack_name, e.city, e.state,
      e.start_time, e.end_time
      FROM events e
      INNER JOIN packs p ON e.pack_id = p.id
      WHERE p.id IN (SELECT up.pack_id FROM users_packs_join up WHERE up.user_id = $1)
      AND e.end_time > (SELECT now());
    `, [query.user_id])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.log('database error - cannot get events', err);
        res.sendStatus(500);
      });
  },
  postEvent: (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    db.query(`
      INSERT INTO events (owner_id, event_name, description, pack_id, city, state, zipcode, start_time, end_time, event_profile_pic_url, street_address1)
      VALUES (1, 'Doggo Day', 'Just a day for good doggos to frolic!', 3, 'Miami', 'FL', '33014', '1970-01-01 00:00:01', '1970-01-01 00:00:02', 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80', '6411 NW 162nd St')
    `)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.log('database error - cannot get events', err);
        res.sendStatus(500);
      });
  },
  getPackEvents: ((req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    db.query(`
    SELECT *
    FROM events
    WHERE pack_id = ${req.query.pack_id}
    ;`)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.log('database error - cannot get events', err);
        res.sendStatus(500);
      });
  }),
  getEventInfo: ((req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    db.query(`
    SELECT * FROM events
    WHERE id = ${req.query.event_id}`)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.log('database error - cannot get event info', err);
        res.sendStatus(500);
      });
  }),
  getAttendees: ((req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    db.query(`
    SELECT * FROM attendees
    WHERE event_id = ${req.query.event_id};`)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.log('database error - cannot get attendee info', err);
      });
  }),
  getMessages: ((req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    db.query(`
      SELECT * FROM event_posts
      WHERE event_id = ${req.query.event_id}
    ;`)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.log('database error - cannot get messages', err);
      });
  }),
};

// EXTRACT('DAY' FROM e.start_time) as day,
// EXTRACT('MONTH' FROM e.start_time) as month,
// EXTRACT('DOW' FROM e.start_time) as day_of_week,
