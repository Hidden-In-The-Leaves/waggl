const db = require('../../database/postgres.js');

/**
 * @route /api/accountsettings/userinformation
 * @method PUT
 * @desc update user information
 */
const putUserInformation = async(req, res) => {
  db.query()
}

/**
 * @route /api/accountsettings/locationinformation
 * @method PUT
 * @desc update location information
 */
 const putLocationInformation = async(req, res) => {
  db.query()
}


module.exports = {
  putUserInformation,
  putLocationInformation
}