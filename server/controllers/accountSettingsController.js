// const db = require('../../database/postgres');

const userData = {
  profile_picture_url: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Cute_dog.jpg',
  first_name: 'John',
  last_name: 'Smith',
  email: 'jsmith@gmail.com',
};

let password = 'myPassword';

const locationData = {
  city: 'Chicago',
  state: 'Illinois',
  discovery_radius: '5 miles',
};

const privacySettings = {
  packVisibility: true,
  locationSharing: false,
};

const getUserInfo = async (req, res) => {
  // db.query();
  res.send(userData);
};

const putUserInfo = async (req, res) => {
  // db.query();
  if (req.body.profile_picture_url !== userData.profile_picture_url) {
    userData.profile_picture_url = req.body.profile_picture_url;
  }
  if (req.body.first_name !== userData.first_name) {
    userData.first_name = req.body.first_name;
  }
  if (req.body.last_name !== userData.last_name) {
    userData.last_name = req.body.last_name;
  }
  if (req.body.email !== userData.email) {
    userData.email = req.body.email;
  }
  res.send();
};

const getLocationInfo = async (req, res) => {
  // db.query();
  res.send(locationData);
};

const putLocationInfo = async (req, res) => {
  // db.query();
  if (req.body.city !== locationData.city) {
    locationData.city = req.body.city;
  }
  if (req.body.state !== locationData.state) {
    locationData.state = req.body.state;
  }
  if (req.body.discovery_radius !== locationData.discovery_radius) {
    locationData.discovery_radius = req.body.discovery_radius;
  }
  res.send();
};

const getPrivacySettings = async (req, res) => {
  // db.query();
  res.send(privacySettings);
};

const putPrivacySettings = async (req, res) => {
  // db.query();
  if (req.body.packVisibility !== privacySettings.pack_visibility) {
    privacySettings.pack_visibility = req.body.packVisibility;
  }
  if (req.body.location_sharing !== privacySettings.locationSharing) {
    privacySettings.locationSharing = req.body.location_sharing;
  }
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
