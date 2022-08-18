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
    const data = req.body;
    db.query(`
      INSERT INTO events (owner_id, event_name, description, pack_id, city, state, zipcode, start_time, end_time, event_profile_pic_url, street_address1, street_address2)
      VALUES (
        ${data.owner_id}, ${data.event_name}, ${data.description}, ${data.pack_id}, ${data.city}, ${data.state}, ${data.zipcode}, ${data.start_time}, ${data.end_time}, ${data.pic}, ${data.street_address1}, ${data.street_address2}
      )
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
        res.sendStatus(500);
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
        res.sendStatus(500);
      });
  }),
  postMessage: ((req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080'); // update to match the domain you will make the request from
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    console.log(req.body);
    const data = req.body;
    console.log(data);
    db.query(`
      INSERT INTO event_posts (event_id, text, poster_id, photo_url) VALUES
      (${data.event_id}, ${data.text}, ${data.poster_id}, ${data.photo_url})
    `)
      .then((result) => {
        res.send('pls');
      })
      .catch((err) => {
        console.log('database error - cannot post messages', err);
        res.sendStatus(500);
      });
  }),
};

// EXTRACT('DAY' FROM e.start_time) as day,
// EXTRACT('MONTH' FROM e.start_time) as month,
// EXTRACT('DOW' FROM e.start_time) as day_of_week,
