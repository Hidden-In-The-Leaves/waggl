const db = require('../../database/postgres');

const getUserInfo = async ({ query }, res) => {
  const id = 1;

  db.query(`
  SELECT first_name, last_name, email, profile_pic_url FROM users WHERE id = ${id}`)
    .then((data) => {
      res.send(data.rows[0]);
    })
    .catch((err) => {
      console.log('database error - cannot get user information', err);
      res.sendStatus(500);
    });
};

const putUserInfo = async ({ body }, res) => {
  const id = 1;

  if (body.password !== 'password') {
    db.query(`
    UPDATE users set
    first_name = '${body.first_name}',
    last_name = '${body.last_name}',
    email = '${body.email}',
    password = '${body.password}',
    profile_pic_url = '${body.profile_picture_url}'
    WHERE id = ${id}
    `)
      .then(() => res.sendStatus(204))
      .catch((err) => {
        console.log('database error - cannot update user info', err);
        res.sendStatus(500);
      });
  } else {
    db.query(`
    UPDATE users set
    first_name = '${body.first_name}',
    last_name = '${body.last_name}',
    email = '${body.email}',
    profile_pic_url = '${body.profile_picture_url}' WHERE id = ${id}
    `)
      .then(() => res.sendStatus(204))
      .catch((err) => {
        console.log('database error - cannot update user info', err);
        res.sendStatus(500);
      });
  }
};

const getLocationInfo = async ({ query }, res) => {
  // console.log(query);
  const id = 1;

  db.query(`
  SELECT city, state FROM users WHERE id = ${id}`)
    .then((data1) => {
      db.query(`SELECT discovery_radius FROM setting_preferences WHERE user_id = ${id}`)
        .then((data2) => {
          res.send([data1.rows[0], data2.rows[0]]);
        })
        .catch((err) => {
          console.log('database error - cannot get user information', err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log('database error - cannot get user information', err);
      res.sendStatus(500);
    });
};

const putLocationInfo = async ({ body }, res) => {
  const id = 1;
  db.query(`
    UPDATE users set
    city = '${body.city}',
    state = '${body.state}'
    WHERE id = ${id}
    `)
    .then(() => {
      db.query(`
      UPDATE setting_preferences set
      discovery_radius = ${body.discovery_radius}
      WHERE id = ${id}`)
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

const getPrivacySettings = async ({ query }, res) => {
  const id = 1;
  db.query(`
  SELECT location_sharing, packs_visible FROM setting_preferences WHERE user_id = ${id}`)
    .then((data) => {
      res.send(data.rows[0]);
    })
    .catch((err) => {
      console.log('database error - cannot get user information', err);
      res.sendStatus(500);
    });
};

const putPrivacySettings = async ({ body }, res) => {
  const id = 1;

  db.query(`
  SELECT * FROM setting_preferences WHERE user_id = ${id}`)
    .then((data) => {
      if (data.rows.length === 0) {
        db.query(`INSERT INTO setting_preferences (user_id, location_sharing, packs_visible, discovery_radius) VALUES (${id}, ${body.location_sharing}, ${body.packs_visible}, 0)`)
          .then(() => res.sendStatus(204))
          .catch((err) => {
            console.log('database error - cannot update privacy settings', err);
            res.sendStatus(500);
          });
      } else {
        db.query(`
        UPDATE setting_preferences set
        packs_visible = ${body.packs_visible},
        location_sharing = ${body.location_sharing}
        WHERE user_id = ${id}
        `)
          .then(() => res.sendStatus(204))
          .catch((err) => {
            console.log('database error - cannot update privacy settings', err);
            res.sendStatus(500);
          });
      }
    })
    .catch((err) => {
      console.log('database error - cannot get user information', err);
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
