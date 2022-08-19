/* eslint-disable no-console */
const db = require('../../database/postgres');

module.exports = {
  createProfile: (req, res) => {
    console.log('create profile request', req);

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


db.query(`SELECT D.*`)