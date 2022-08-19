const db = require('../../database/postgres');

module.exports = {
  checkCookie: (req, res) => {
    db.query(`
      SELECT user_id FROM SESSION WHERE session_id = $1
    `, [req.query.session_id])
      .then((result) => res.json(result.rows))
      .catch((err) => {
        console.log('error getting session info', err);
        res.sendStatus(500);
      });
  },
  storeCookie: (req, res) => {
    db.query(`
      INSERT INTO SESSION (user_id, session_id)
      VALUES ($1, $2)
    `, [req.body.user_id, req.body.session_id])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log('error inserting into session', err);
        res.sendStatus(500);
      });
  },
};
