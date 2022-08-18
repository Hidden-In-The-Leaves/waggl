const db = require('../../database/postgres');

module.exports = {
  getUserDetails: (req, res) => {
    db.query(`
      with dogspics as (
        select d.*, json_agg(dp.url) as photos
        from dogs d
        inner join dog_pictures dp
        on d.id = dp.dog_id
        group by d.id
      )
      select u.*, p.location_sharing, p.packs_visible,
      json_agg(
        d.*
      ) as dogs
      from users u inner join setting_preferences p
      on u.id = p.user_id
      inner join dogspics d
      on u.id = d.user_id
      where u.id = $1
      group by u.id, p.location_sharing, p.packs_visible;
    `, [req.params.userid])
      .then((result) => res.json(result.rows))
      .catch((err) => {
        console.log('Error: failed to get user details', err);
        res.sendStatus(500);
      });
  },

};
