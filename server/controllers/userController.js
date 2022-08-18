/* eslint-disable camelcase */
/* eslint-disable no-console */
const db = require('../../database/postgres');

module.exports = {
  createUser: ({ body }, res) => {
    console.log('body ', body);
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

};
