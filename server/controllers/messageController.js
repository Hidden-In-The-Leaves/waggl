const db = require('../../database/postgres');

/**
 * @route /api/message
 * @method GET
 * @desc get a message
 */
const getMessage = async () => {
  db.query();
};

module.exports = {
  getMessage,
};
