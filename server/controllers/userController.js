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
};

/**
 *
 * sample:
 * juannncodes@gmail.com
 * CREATE TABLE "users"(
 *     "id" SERIAL NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "profile_pic_url" VARCHAR(255),
    "latitude" VARCHAR(255),
    "longitude" VARCHAR(255),
    "city" VARCHAR(255),
    "state" VARCHAR(255)
 */