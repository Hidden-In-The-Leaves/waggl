const db = require('../../database/postgres');

module.exports = {
  getByUserId: (req, res) => {
    const userid = req.params.userid;
    db.query(`
      select
        p.id, p.pack_name as name, p.calendar_id, p.pack_profile_pic_url as url, p.description,
        case when u.user_id = $1 then 'true' else 'false' end as joined
      from packs p full join users_packs_join u on p.id = u.pack_id;
    `, [userid])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.log('error querying packs by userid', err);
        res.sendStatus(500);
      })
  },
  getAll: (req, res) => {
    db.query(`
      select
        p.id, p.pack_name, p.calendar_id, p.pack_profile_pic_url
      from packs p;
    `)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.log('error querying packs by userid', err);
        res.sendStatus(500);
      });
  },
}