/* eslint-disable no-console */
const db = require('../../database/postgres');

module.exports = {
  getEvents: ({ query }, res) => {
    db.query(`
      SELECT e.id, e.event_name, p.pack_name, e.city, e.state,
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
};

// EXTRACT('DAY' FROM e.start_time) as day,
// EXTRACT('MONTH' FROM e.start_time) as month,
// EXTRACT('DOW' FROM e.start_time) as day_of_week,