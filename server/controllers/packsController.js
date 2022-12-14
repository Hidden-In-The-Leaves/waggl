/* eslint-disable camelcase */
/* eslint-disable no-console */
const db = require('../../database/postgres');

module.exports = {
  getJoinedPacks: ({ query }, res) => {
    db.query(
      `
        SELECT
          p.id, p.pack_name as name, p.calendar_id, p.pack_profile_pic_url as url, p.description
        FROM packs p INNER JOIN users_packs_join u ON p.id = u.pack_id
        WHERE u.user_id = $1
        ORDER BY lower(p.pack_name);
      `,
      [query.user_id]
    )
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.log('database error - cannot get pack by userid', err);
        res.sendStatus(500);
      });
  },
  getOtherPacks: ({ query }, res) => {
    db.query(
      `
    WITH RES AS
      (SELECT DISTINCT P.ID,
          P.PACK_NAME AS NAME,
          P.CALENDAR_ID,
          P.PACK_PROFILE_PIC_URL AS URL,
          P.DESCRIPTION
        FROM PACKS P
        LEFT JOIN USERS_PACKS_JOIN U ON P.ID = U.PACK_ID
        WHERE PACK_ID not in
            (SELECT PACK_ID
              FROM PACKS P2
              INNER JOIN USERS_PACKS_JOIN U2 ON P2.ID = U2.PACK_ID
              WHERE U2.USER_ID = $1) )
    SELECT *
    FROM RES
    ORDER BY LOWER(NAME);
    `,
      [query.user_id]
    )
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.log('database error - cannot get pack by userid', err);
        res.sendStatus(500);
      });
  },
  createPack: ({ body }, res) => {
    /* TODO : generate calendar_id everytime a pack is created - ASK CHRIS*/
    const calendarId = 1;
    db.query(`SELECT count(*) FROM packs WHERE pack_name = $1`, [body.name])
      .then((result) => {
        if (result.rows[0].count > 0) {
          res.status(404).end('Error: pack name is already taken.');
        } else {
          return db.query(
            `WITH insert1 AS (
              INSERT INTO packs (pack_name, calendar_id, owner_id, pack_profile_pic_url, description)
              VALUES ( $1, $2, $3, $4, $5 ) RETURNING ID as pack_id
            )
            INSERT INTO users_packs_join (pack_id, user_id)
            SELECT pack_id, $3 FROM insert1
          `,
            [
              body.name,
              calendarId,
              body.owner_id,
              body.url || '',
              body.description,
            ]
          );
        }
      })
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log('database error - cannot insert pack', err);
        res.sendStatus(500);
      });
  },

  updatePack: ({ body }, res) => {
    db.query(
      `
      UPDATE packs set
        pack_name = $1,
        description = $2,
        pack_profile_pic_url = $3
      WHERE id = $4
    `,
      [body.name, body.description, body.url, body.id]
    )
      .then(() => res.sendStatus(204))
      .catch((err) => {
        console.log('database error - cannot update pack', err);
        res.sendStatus(500);
      });
  },

  deletePack: (req, res) => {
    db.query(
      `
      DELETE FROM packs
      WHERE id = $1
    `,
      [req.params.id]
    )
      .then(() => res.sendStatus(204))
      .catch((err) => {
        console.log('database error - cannot delete pack', err);
        res.sendStatus(500);
      });
  },

  getPosts: ({ query }, res) => {
    if (query.user_id) {
      db.query(
        `
        SELECT p.id, p.pack_id, p.text, u.id as poster_id, CONCAT(u.first_name, ' ', u.last_name) as poster, u.profile_pic_url as poster_photo_url, p.photo_url, p.posted_time
        FROM pack_posts p
        INNER JOIN users_packs_join up
        ON p.pack_id = up.pack_id
        INNER JOIN users u
        ON p.poster_id = u.id
        WHERE up.user_id = $1
        ORDER BY p.posted_time DESC
      `,
        [query.user_id]
      )
        .then((result) => {
          res.send(result.rows);
        })
        .catch((err) => {
          console.log('database error - cannot get pack posts', err);
          res.sendStatus(500);
        });
    } else if (query.pack_id) {
      db.query(
        `
        SELECT p.id, p.text, p.poster_id, CONCAT(u.first_name, ' ', u.last_name) as poster, u.profile_pic_url as poster_photo_url, p.photo_url, p.posted_time
        FROM pack_posts p
        INNER JOIN packs pa
        ON p.pack_id = pa.id
        INNER JOIN users u
        ON p.poster_id = u.id
        WHERE p.pack_id = $1
        ORDER BY p.posted_time DESC
      `,
        [query.pack_id]
      )
        .then((result) => {
          res.send(result.rows);
        })
        .catch((err) => {
          console.log('database error - cannot get pack posts', err);
          res.sendStatus(500);
        });
    }
  },

  createPost: ({ body }, res) => {
    db.query(
      `
    INSERT INTO pack_posts (pack_id, text, poster_id, photo_url, posted_time)
    select $1, $2, $3, $4, now()
    `,
      [body.pack_id, body.text, body.poster_id, body.photo_url || '']
    )
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log('database error - cannot create post', err);
        res.sendStatus(500);
      });
  },

  updatePost: ({ body }, res) => {
    db.query(
      `
      UPDATE pack_posts set
        text = $1,
        photo_url = $2
      WHERE id = $3
    `,
      [body.text, body.photo_url, body.id]
    )
      .then(() => res.sendStatus(204))
      .catch((err) => {
        console.log('database error - cannot update post', err);
        res.sendStatus(500);
      });
  },

  deletePost: (req, res) => {
    db.query(
      `
      DELETE FROM pack_posts
      WHERE id = $1
    `,
      [req.params.id]
    )
      .then(() => res.sendStatus(204))
      .catch((err) => {
        console.log('database error - cannot delete post', err);
        res.sendStatus(500);
      });
  },
  getPack: (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    db.query(
      `
      SELECT * FROM packs
      WHERE id = ${req.query.pack_id}
    `
    )
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.log('database error - cannot get pack', err);
        res.sendStatus(500);
      });
  },
  getPackUsers: ({ query }, res) => {
    db.query(`
      SELECT
        up.user_id,
        CONCAT(u.first_name, ' ', u.last_name) as name,
        u.city, u.profile_pic_url, u.state
      FROM users_packs_join up
      INNER JOIN users u
      ON up.user_id = u.id
      WHERE up.pack_id = $1
    `, [query.pack_id])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.log('database error - cannot get pack users', err);
        res.sendStatus(500);
      });
  }
};
