const db = require('../../database/postgres');

const getUserInfo = async (req, res) => {
  db.query(`
  SELECT first_name, last_name, email, profile_pic_url FROM users WHERE id = ${req.params.id}`)
    .then((data) => {
      res.send(data.rows[0]);
    })
    .catch((err) => {
      console.log('database error - cannot get user information', err);
      res.sendStatus(500);
    });
};

const putUserInfo = async (req, res) => {
  if (req.body.password !== 'password') {
    db.query(`
    UPDATE users set
    first_name = '${req.body.first_name}',
    last_name = '${req.body.last_name}',
    email = '${req.body.email}',
    password = '${req.body.password}',
    profile_pic_url = '${req.body.profile_picture_url}'
    WHERE id = ${req.params.id}
    `)
      .then(() => res.sendStatus(204))
      .catch((err) => {
        console.log('database error - cannot update user info', err);
        res.sendStatus(500);
      });
  } else {
    db.query(`
    UPDATE users set
    first_name = '${req.body.first_name}',
    last_name = '${req.body.last_name}',
    email = '${req.body.email}',
    profile_pic_url = '${req.body.profile_picture_url}' WHERE id = ${req.params.id}
    `)
      .then(() => res.sendStatus(204))
      .catch((err) => {
        console.log('database error - cannot update user info', err);
        res.sendStatus(500);
      });
  }
};

const getLocationInfo = async (req, res) => {
  db.query(`
  SELECT city, state FROM users WHERE id = ${req.params.id}`)
    .then((data1) => {
      db.query(`SELECT discovery_radius FROM setting_preferences WHERE user_id = ${req.params.id}`)
        .then((data2) => {
          res.send([data1.rows[0], data2.rows[0]]);
        })
        .catch((err) => {
          console.log('database error - cannot get user location', err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log('database error - cannot get user location', err);
      res.sendStatus(500);
    });
};

const putLocationInfo = async (req, res) => {
  db.query(`
    UPDATE users set
    city = '${req.body.city}',
    state = '${req.body.state}'
    WHERE id = ${req.params.id}
    `)
    .then(() => {
      // some issue with updating discovery radius
      db.query(`
      UPDATE setting_preferences set
      discovery_radius = ${req.body.discovery_radius}
      WHERE user_id = ${req.params.id}`)
        .then(() => res.sendStatus(204))
        .catch((err) => {
          console.log('database error - cannot update location info', err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log('database error - cannot update location info', err);
      res.sendStatus(500);
    });
};

const getPrivacySettings = async (req, res) => {
  db.query(`
  SELECT * FROM setting_preferences WHERE user_id = ${req.params.id}`)
    .then((data) => {
      res.send(data.rows[0]);
    })
    .catch((err) => {
      console.log('database error - cannot get user privacy settings', err);
      res.sendStatus(500);
    });
};

const putPrivacySettings = async (req, res) => {
  db.query(`
  SELECT * FROM setting_preferences WHERE user_id = ${req.params.id}`)
    .then((data) => {
      if (data.rows.length === 0) {
        db.query(`INSERT INTO setting_preferences (user_id, location_sharing, packs_visible, discovery_radius) VALUES (${req.params.id}, ${req.body.location_sharing}, ${req.body.packs_visible}, 0)`)
          .then(() => res.sendStatus(204))
          .catch((err) => {
            console.log('database error - cannot update privacy settings', err);
            res.sendStatus(500);
          });
      } else {
        db.query(`
        UPDATE setting_preferences set
        packs_visible = ${req.body.packs_visible},
        location_sharing = ${req.body.location_sharing}
        WHERE user_id = ${req.params.id}
        `)
          .then(() => res.sendStatus(204))
          .catch((err) => {
            console.log('database error - cannot update privacy settings', err);
            res.sendStatus(500);
          });
      }
    })
    .catch((err) => {
      console.log('database error - cannot get update user privacy info', err);
      res.sendStatus(500);
    });
};

module.exports = {
  getUserInfo,
  putUserInfo,
  getLocationInfo,
  putLocationInfo,
  getPrivacySettings,
  putPrivacySettings,
};
