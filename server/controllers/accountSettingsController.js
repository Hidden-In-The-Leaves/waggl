// const db = require('../../database/postgres');

const getUserInfo = async (req, res) => {
  // db.query();
  const data = {
    first_name: 'John',
    last_name: 'Smith',
    email: 'jsmith@gmail.com',
  };
  res.send(data);
};

const getLocationInfo = async (req, res) => {
  // db.query();
  const data = {
    city: 'Chicago',
    state: 'Illinois',
    discovery_radius: '5 miles',
  };
  res.send(data);
};

const getPrivacySettings = async (req, res) => {
  // db.query();
  const data = {
    packVisibility: 'on',
    locationSharing: 'off',
  };
  res.send(data);
};

module.exports = {
  getUserInfo,
  getLocationInfo,
  getPrivacySettings,
};
