/* eslint-disable no-console */
const db = require('../../database/postgres');

module.exports = {
  createProfile: (req, res) => {
    let {
      name, age, size, user_id, likes, dislikes, gender, description, photos, personalities
    } = req.body;
    console.log('create profile request', req);
    db.query(`
      INSERT INTO dogs
        (name, age, size, user_id, likes, dislikes, gender, description)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING ID as dog_id`,
    [name, age, size, user_id, likes || null, dislikes || null, gender, description || ''])
      .then((result) => {
        const newID = result.rows[0].dog_id;
        const urls = [];
        for (let i = 0; i < photos.length; i++) {
          urls.push(db.query(
            `INSERT INTO dog_pictures
              (dog_id, url)
            VALUES ($1, $2)`,
            [newID, photos[i]],
          ));
        }

        for (let i = 0; i < personalities.length; i++) {
          urls.push(db.query(
            `INSERT INTO traits
              (trait, dog_id)
            VALUES ($1, $2)`,
            [personalities[i], newID]
          ));
        }

        Promise.all(urls)
          .then(() => res.sendStatus(200))
          .catch((err) => { console.log('🟥There was an error', err); });
      })
      .catch((err) => { console.log('🟥There was an error creating profile', err); });
  },

  editProfile: (req, res) => {
    console.log('edit profile request', req);
  },

  getProfiles: (req, res) => {
    console.log('get all profiles request', req);
    db.query(`
    SELECT
        D.*,
        JSON_AGG(DP.URL) AS PHOTOS,
    JSON_AGG(T.trait) AS TRAITS
      FROM DOGS D
      INNER JOIN DOG_PICTURES DP ON D.ID = DP.DOG_ID
    INNER JOIN TRAITS T ON D.ID = T.DOG_ID
      WHERE D.USER_ID = $1
      GROUP BY D.ID
    `, [req.query.user_id])
      .then((result) => res.json(result.rows))
      .catch((err) => {
        console.log('Error: failed to get user details', err);
        res.sendStatus(500);
      });
  },
};
