/* eslint-disable no-console */
const db = require('../../database/postgres');

module.exports = {
  getByUserId: ({ params }, res) => {
    const { userid } = params;
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
    `, [userid])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {``
        console.log('database error - cannot get pack by userid', err);
        res.sendStatus(500);
      });
  },
  getAll: (req, res) => {
    db.query(`
      SELECT
        p.id, p.pack_name, p.calendar_id, p.pack_profile_pic_url
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
  },
  createPack: ({ body }, res) => {
    /* TODO : generate calendar_id everytime a pack is created - ASK CHRIS*/
    const calendarId = 1;
    db.query(`
      INSERT INTO packs (pack_name, calendar_id, owner_id, pack_profile_pic_url, description)
      VALUES ( $1, $2, $3, $4, $5 )
    `, [body.name, calendarId, body.owner_id, body.url || '', body.description])
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
};
