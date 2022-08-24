/* eslint-disable camelcase */
/* eslint-disable no-console */
const db = require('../../database/postgres');

module.exports = {
  createUser: ({ body }, res) => {
    db.query(`
    INSERT INTO users (first_name, last_name, email, password)
    VALUES ( $1, $2, $3, $4 ) RETURNING ID as user_id
  `, [body.first_name, body.last_name, body.email, body.password])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.log('database error - cannot create user', err);
        res.sendStatus(500);
      });
  },

  createUserByThridProvider: ({ body }, res) => {
    db.query(`
    INSERT INTO users (first_name, last_name, email, password, profile_pic_url)
    VALUES ( $1, $2, $3, $4, $5 ) RETURNING ID as user_id
  `, [body.first_name, body.last_name, body.email, new Date().toString(), body.photoUrl])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.log('database error - cannot create user by thrid party provider', err);
        res.sendStatus(500);
      });
  },

  getUserByEmail: ({ query }, res) => {
    db.query(`
      SELECT *
      FROM users
      WHERE email = $1
    `, [query.email])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.log('database error - cannot get user information', err);
        res.sendStatus(500);
      });
  },

  getUsers: (req, res) => {
    db.query(`
      SELECT *
      FROM users
    `)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.log('database error - cannot get user information', err);
        res.sendStatus(500);
      });
  },

  getUserDetails: (req, res) => {
    db.query(`
    WITH DOGSPICS AS
      (SELECT D.*,
          JSON_AGG(DP.URL) AS PHOTOS
        FROM DOGS D
        INNER JOIN DOG_PICTURES DP ON D.ID = DP.DOG_ID
        GROUP BY D.ID)
    SELECT U.*,
      P.LOCATION_SHARING,
      P.PACKS_VISIBLE,
      COALESCE(json_agg(D.*), '[]'::json) AS DOGS
    FROM USERS U
    LEFT JOIN SETTING_PREFERENCES P ON U.ID = P.USER_ID
    LEFT JOIN DOGSPICS D ON U.ID = D.USER_ID
    WHERE U.ID = $1
    GROUP BY U.ID,
      P.LOCATION_SHARING,
      P.PACKS_VISIBLE;
    `, [req.params.userid])
      .then((result) => res.json(result.rows))
      .catch((err) => {
        console.log('Error: failed to get user details', err);
        res.sendStatus(500);
      });
  },

};
