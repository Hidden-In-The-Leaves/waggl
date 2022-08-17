const db = require("../../database/postgres");

/**
 * @route /api/messages?user1=?&user2=?
 * @method GET
 * @desc get all messages from user1 and user2
 */
const getMessage = async (req, res) => {
  const user1 = req.query.user1;
  const user2 = req.query.user2;
  const messages = await db.query(
    `SELECT * FROM direct_messages WHERE sender_id=${user1} AND receiver_id=${user2} OR sender_id=${user2} AND receiver_id=${user1};`
  );
  if (messages) {
    res.status(200).send(messages.rows);
  } else {
    res.send({ Error: "some error" });
  }
};

/**
 * @route /api/messages?user1=?&user2=?
 * @method POST
 * @desc post a message
 */
const postMessage = async (req, res) => {
  const user1 = req.body.sender_id;
  const user2 = req.body.receiver_id;
  const message = req.body.message_text;
  const posted_time = req.body.posted_time;
  const a = await db.query(
    `INSERT INTO direct_messages (sender_id, receiver_id, message_text, posted_time) values (${user1}, ${user2}, '${message}', '${posted_time}');`
  );
  if (a) {
    res.send({ Success: "message added" });
  } else {
    res.send({ Fail: "unable to add message" });
  }
};

/**
 * @route /api/messages/group?packId=?
 * @method GET
 * @desc get messages for this pack
 */
const getGroupMessage = async (req, res) => {
  const packId = req.query.packId;
  const messages = await db.query(
    `SELECT json_agg(ms) AS messages from (
      SELECT gm.message_text, gm.posted_time,
      (
        SELECT json_build_object('user_id', id, 'first_name', first_name, 'last_name', last_name, 'image', profile_pic_url) FROM users WHERE id=gm.user_id
      ) AS users
      FROM group_message AS gm WHERE gm.pack_id=${packId}
    )ms;`
  );
  if (messages) {
    res.status(200).send(messages.rows[0].messages);
  } else {
    res.send({ Error: "unable to get messages" });
  }
};

/**
 * @route /api/messages/group?packId=?
 * @method POST
 * @desc post a message to this pack
 */
const postGroupMessage = async (req, res) => {
  const packId = req.query.packId;
  const message = req.body.message_text;
  const posted_time = req.body.posted_time;
  const sender_id = req.body.user_id;
  const a = await db.query(`
  INSERT INTO group_message (pack_id, message_text, posted_time, user_id) VALUES (${packId}, '${message}', '${posted_time}', '${sender_id}');`);
  if (a) {
    res.send({ Success: "added a message" });
  } else {
    res.send({ Fail: "unable to send a message" });
  }
};

/**
 * for test
 * @route /api/messages/pack?userId=?
 * @method GET
 * @desc get all packs the user joined
 */
const getUserPacks = async (req, res) => {
  const userId = req.query.userId;
  const packs = await db.query(`
  SELECT json_agg(pk) as packs FROM (
    SELECT upj.pack_id,
    (
      SELECT json_agg(json_build_object('pack_name',pack_name, 'image', pack_profile_pic_url))
		from packs where id = upj.pack_id
    ) as pack
    FROM users_packs_join AS upj WHERE upj.user_id=${userId}
  )pk;
  `);
  if (packs) {
    res.status(200).send(packs.rows[0].packs);
  } else {
    res.send({ Error: "unable to get packs" });
  }
};

/**
 * for test
 * @route /api/messages/pack/members?packId=?
 * @method GET
 * @desc get all members of a pack
 */
const getPackMember = async (req, res) => {
  const packId = req.query.packId;
  const members = await db.query(`
    SELECT json_agg(json_build_object('first_name', first_name, 'last_name', last_name, 'image', profile_pic_url)) FROM users WHERE id IN (SELECT user_id FROM users_packs_join WHERE pack_id=${packId})
  `);
  if (members) {
    res.status(200).send(members.rows[0].json_agg);
  } else {
    res.send({ Error: "unable to get members" });
  }
};

/**
 * for test
 * @route /api/messages/pack/user?userid=?
 * @method GET
 * @desc get info of a user
 */
const getUser = async (req, res) => {
  const userId = req.query.userid;
  const user = await db.query(
    `SELECT first_name, last_name, profile_pic_url as image from users where id=${userId};`
  );
  if (user) {
    res.status(200).send(user.rows[0]);
  } else {
    res.send({ Error: "unable to get user" });
  }
};
module.exports = {
  getMessage,
  postMessage,
  getGroupMessage,
  postGroupMessage,
  getUserPacks,
  getPackMember,
  getUser,
};
