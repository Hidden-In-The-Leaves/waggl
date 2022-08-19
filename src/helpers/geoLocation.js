const axios = require('axios');

// GPS objects should be JS Objects with a lat and lng property
// ex: {lat: 56564, lng: 775045}
// 19307 Manor Church Road Boonsboro, MD 21713
module.exports = {
  getGPS: (addy) => {
    let result = {};
    axios({
      method: 'get',
      url: 'https://maps.googleapis.com/maps/api/geocode/json',
      params: {
        address: addy,
        key: process.env.MAPS_API_KEY,
      },
    })
      .then((res) => {
        result = res.data.results[0].geometry.location;
        return res.data.results[0].geometry.location;
      })
      .catch((err) => {
        console.log('🟥', err);
      });
    return result;
  },
  getDistance: (gps1, gps2) => {
    // orthodromic/great-circle distance is the shortest distance between 2 points on a sphere
    // we can use the Haversine formula to solve this

    // convert lat and lng to radians
    // lat / (180/pi) or lat/57.29577951
    // lng / (180/pi) or lng/57.29577951

    // get the distance in miles between these 2 radian values
    // d = 3963.0 * arccos[(sin(lat1) * sin(lat2)) + cos(lat1) * cos(lat2) * cos(lng2 - lng1)]

    // get the distance in km between these 2 radian values
    // just calculate for miles then multiply by 1.609344

    // The math module contains a function named toRadians which converts from degrees to radians
    const lat1 = (gps1.lat * Math.PI) / 180;
    const lat2 = (Number(gps2.lat) * Math.PI) / 180;

    const lng1 = (gps1.lng * Math.PI) / 180;
    const lng2 = (Number(gps2.lng) * Math.PI) / 180;

    // Haversine formula
    const dlng = lng2 - lng1;
    const dlat = lat2 - lat1;
    const a =
      Math.sin(dlat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlng / 2) ** 2;
    const c = 2 * Math.asin(Math.sqrt(a));
    // earth radius in miles
    const r = 3956;
    const distance = c * r;

    // set the distance between the coordinates
    // setDistance(distance);
    return distance;
  },
  // relies on the getDistance helper fn
  // input the radius size in miles, the center of the radius and any other gps objects to be sorted
  sortBy: (radius, center, helper, rest) => {
    const sortedResults = [];
    rest.forEach((obj) => {
      const inRange = [];
      const distance = helper(
        center,
        obj
      ); /* <== might need to get the proper alias fro getDistance helper fn */
      if (distance <= radius) {
        inRange.push(distance, obj);
        sortedResults.push(inRange);
      }
    });
    sortedResults.sort((a, b) => {
      // a is closer
      if (a[0] < b[0]) {
        return -1;
      }
      // b is closer
      if (a[0] > b[0]) {
        return 1;
      }
      // a, b same distance
      return 0;
    });
    return sortedResults;
  },
};
