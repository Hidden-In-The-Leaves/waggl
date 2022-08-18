/* eslint-disable camelcase */
/* eslint-disable no-console */
const db = require('../../database/postgres');

module.exports = {
  getPacks: ({ query }, res) => {
    const { user_id } = query;
    if (user_id === undefined) {
      db.query(`
      SELECT
        p.id, p.pack_name, p.calendar_id, p.pack_profile_pic_url, p.description
      FROM packs p
      ORDER BY lower(p.pack_name);
      `)
        .then((result) => {
          res.send(result.rows);
        })
        .catch((err) => {
          console.log('database error - cannot get pack', err);
          res.sendStatus(500);
        });
    } else {
      db.query(`
        SELECT
          p.id, p.pack_name as name, p.calendar_id, p.pack_profile_pic_url as url, p.description,
          CASE
            WHEN u.user_id = $1 THEN 'true'
            WHEN p.owner_id = $1 THEN 'true'
            ELSE 'false'
          END as joined
        FROM packs p FULL JOIN users_packs_join u ON p.id = u.pack_id
        ORDER BY lower(p.pack_name);
      `, [user_id])
        .then((result) => {
          res.send(result.rows);
        })
        .catch((err) => {
          console.log('database error - cannot get pack by userid', err);
          res.sendStatus(500);
        });
    }
  },
  createPack: ({ body }, res) => {
    /* TODO : generate calendar_id everytime a pack is created - ASK CHRIS*/
    const calendarId = 1;
    db.query(`SELECT count(*) FROM packs WHERE pack_name = $1`, [body.name])
      .then((result) => {
        if (result.rows[0].count > 0) {
          res.status(404).end('pack name is already taken.');
        } else {
          return db.query(
            `WITH insert1 AS (
              INSERT INTO packs (pack_name, calendar_id, owner_id, pack_profile_pic_url, description)
              VALUES ( $1, $2, $3, $4, $5 ) RETURNING ID as pack_id
            )
            INSERT INTO users_packs_join (pack_id, user_id)
            SELECT pack_id, $3 FROM insert1
          `, [body.name, calendarId, body.owner_id, body.url || '', body.description])
        }
      })
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log('database error - cannot insert pack', err);
        res.sendStatus(500);
      });
  },

  updatePack: ({ body }, res) => {
    db.query(`
      UPDATE packs set
        pack_name = $1,
        description = $2,
        pack_profile_pic_url = $3
      WHERE id = $4
    `, [body.name, body.description, body.url, body.id])
      .then(() => res.sendStatus(204))
      .catch((err) => {
        console.log('database error - cannot update pack', err);
        res.sendStatus(500);
      });
  },

  deletePack: (req, res) => {
    db.query(`
      DELETE FROM packs
      WHERE id = $1
    `, [req.params.id])
      .then(() => res.sendStatus(204))
      .catch((err) => {
        console.log('database error - cannot delete pack', err);
        res.sendStatus(500);
      });
  },

  getPosts: ({ query }, res) => {
    db.query(`
      SELECT p.id, p.pack_id, p.text, CONCAT(u.first_name, ' ', u.last_name) as poster, u.profile_pic_url as poster_photo_url, p.photo_url, p.posted_time
      FROM pack_posts p
      INNER JOIN users_packs_join up
      ON p.pack_id = up.pack_id
      INNER JOIN users u
      ON p.poster_id = u.id
      WHERE u.id = $1
      OR p.poster_id = $1
      ORDER BY p.posted_time DESC
    `, [query.user_id])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.log('database error - cannot get pack posts', err);
        res.sendStatus(500);
      });
  },

  createPost: ({ body }, res) => {
    db.query(`
    INSERT INTO pack_posts (pack_id, text, poster_id, photo_url, posted_time)
    select $1, $2, $3, $4, now()
    `, [body.pack_id, body.text, body.poster_id, body.photo_url || ''])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log('database error - cannot create post', err);
        res.sendStatus(500);
      });
  },

  updatePost: ({ body }, res) => {
    db.query(`
      UPDATE pack_posts set
        text = $1,
        photo_url = $2
      WHERE id = $3
    `, [body.text, body.photo_url, body.id])
      .then(() => res.sendStatus(204))
      .catch((err) => {
        console.log('database error - cannot update post', err);
        res.sendStatus(500);
      });
  },

  deletePost: (req, res) => {
    db.query(`
      DELETE FROM pack_posts
      WHERE id = $1
    `, [req.params.id])
      .then(() => res.sendStatus(204))
      .catch((err) => {
        console.log('database error - cannot delete post', err);
        res.sendStatus(500);
      });
  },
  getPack: (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    db.query(`
      SELECT * FROM packs
      WHERE id = ${req.query.pack_id}
    `)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.log('database error - cannot get pack', err);
        res.sendStatus(500);
      });
  },
};
