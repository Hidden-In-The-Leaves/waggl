const db = require('../../database/postgres');

/**
 * @route /api/test
 * @method GET
 * @desc get all users
 */
const getUsers = async (req, res) => {
  // const users = await db.query(
  //   'SELECT id, first_name, last_name, email, profile_pic_url AS image, latitude AS lat, longitude AS lng FROM users;'
  // );
  try {
    const users = await db.query(
      `select json_agg(st) as results
    from (
      select d.id, d.name, d.age, d.size, d.likes, d.dislikes, d.description, concat(u.first_name, ' ', u.last_name) as owner, u.id as owner_id,
      u.latitude as lat, u.longitude as lng, u.city, u.state, u.email, u.profile_pic_url as image,
      (
        select json_agg(t.trait)
        from (
          select * from traits where dog_id = d.id
        ) t
        ) as traits,
        (
          select json_agg(dp.url)
          from (
          select * from dog_pictures where dog_id=d.id
        ) dp
        ) as images
      from dogs as d, users as u where d.user_id=u.id
    ) st;
    `
    );
    res.status(200).send(users.rows[0].results);
  } catch (err) {
    res.send({ Error: err.stack });
  }
};

/**
 * @route /api/test/dog?dogId=?
 * @method GET
 * @desc get info about a dog
 */
const getDog = async (req, res) => {
  const dog_id = req.query.dogId;
  try {
    const dog = await db.query(
      `
      select json_agg(st) as results
    from (
      select d.id, d.name, d.age, d.size, d.likes, d.dislikes, d.description, concat(u.first_name, ' ', u.last_name) as owner, u.id as owner_id,
      u.latitude as lat, u.longitude as lng, u.city, u.state, u.email, u.profile_pic_url as image,
      (
        select json_agg(t.trait)
        from (
          select * from traits where dog_id = d.id
        ) t
        ) as traits,
        (
          select json_agg(dp.url)
          from (
          select * from dog_pictures where dog_id=d.id
        ) dp
        ) as images
      from dogs as d, users as u where d.user_id=u.id and d.id=${dog_id}
    ) st;
      `
    );
    res.status(200).send(dog.rows[0].results[0]);
  } catch (err) {
    res.send({ Error: err.stack });
  }
};

/**
 * @route /api/test/like
 * @method POST
 * @desc like or dislike a dog
 */
const likeDog = async (req, res) => {
  const from = req.body.from_id;
  const to = req.body.to_id;
  const like_level = req.body.like_level;
  try {
    await db.query(
      `INSERT INTO likes_dislikes (from_id, to_id, like_level) VALUES (${from}, ${to}, ${like_level});`
    );
    res.send({ Success: 'add like status to a dog' });
  } catch (err) {
    res.send({ Error: err.stack });
  }
};

/**
 * @route /api/test/like?userid=?
 * @method GET
 * @desc get like list
 */
const getMatchList = async (req, res) => {
  const userid = req.query.userid;
  console.log(userid);
  try {
    const matchList = await db.query(
      `select id, concat(first_name, ' ', last_name) as owner, email, profile_pic_url as image
      from users where id in (
        select user_id from dogs where id in (
          select to_id from likes_dislikes where like_level > 0 and from_id=${userid}
        )
      );`
    );
    res.status(200).send(matchList.rows);
  } catch (err) {
    res.send({ Error: err.stack });
  }
};

/**
 * @route /api/test/match
 * @method POST
 * @desc delete a match
 */
const deleteMatch = async (req, res) => {
  console.log(req.body);
  const from = req.body.from_id;
  const to = req.body.to_id;
  try {
    await db.query(
      `DELETE FROM likes_dislikes WHERE from_id=${from} AND to_id IN
      (
        SELECT id FROM dogs WHERE user_id=${to}
      );`
    );
    console.log('success');
    res.send({ Success: 'removed a match' });
  } catch (err) {
    res.send({ Error: err.stack });
  }
};

module.exports = { getUsers, likeDog, getMatchList, deleteMatch, getDog };
