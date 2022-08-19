/* eslint-disable no-console */
const db = require('../../database/postgres');

module.exports = {
  createProfile: (req, res) => {
    let {
      name, age, size, user_id, likes, dislikes, gender, description, photos, personalities
    } = req.params;
    let newID = '';
    let urls = [];
    console.log('create profile request', req);
    db.query(`INSERT INTO dogs (name, age, size, user_id, likes, dislikes, gender, description)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING ID as dog_id`,
    [name, age, size, user_id, likes || null, dislikes || null, gender, description || ''])
      .then((res) => {
        newID = res.data.rows[0];
        for (var i = 0; i < photos.length; i++) {
          urls.push(db.query(`INSERT INTO dog_pictures (dog_id, url) VALUES ($1, $2)`, [newID, photos[i]]));
        }

        for (var i = 0; i < personalities.length; i++) {
          urls.push(db.query(`INSERT INTO traits (trait, dog_id) VALUES ($1, $2)`, [personalities[i], newID]));
        }

        promise.all(urls)
          .then((res) => { res.send(200); })
          .catch((err) => { console.log('🟥There was an error'); });
      })
      .catch((err) => { console.log('🟥There was an error creating profile', err); });
  },

  editProfile: (req, res) => {
    console.log('edit profile request', req);
  },

  getProfiles: (req, res) => {
    console.log('get all profiles request', req);
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
    INNER JOIN SETTING_PREFERENCES P ON U.ID = P.USER_ID
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
