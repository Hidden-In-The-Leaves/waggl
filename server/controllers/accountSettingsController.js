// const db = require('../../database/postgres');

const userData = {
  first_name: 'John',
  last_name: 'Smith',
  email: 'jsmith@gmail.com',
};

const locationData = {
  city: 'Chicago',
  state: 'Illinois',
  discovery_radius: '5 miles',
};

const privacySettings = {
  packVisibility: 'on',
  locationSharing: 'off',
};

const getUserInfo = async (req, res) => {
  // db.query();
  res.send(userData);
};

const putUserInfo = async (req, res) => {
  // db.query();
  res.send();
};

const getLocationInfo = async (req, res) => {
  // db.query();
  res.send(locationData);
};

const putLocationInfo = async (req, res) => {
  // db.query();
  res.send();
};

const getPrivacySettings = async (req, res) => {
  // db.query();
  res.send(privacySettings);
};

const putPrivacySettings = async (req, res) => {
  // db.query();
  res.send();
};

module.exports = {
  getUserInfo,
  putUserInfo,
  getLocationInfo,
  putLocationInfo,
  getPrivacySettings,
  putPrivacySettings,
};
