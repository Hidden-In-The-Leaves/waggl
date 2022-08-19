const { AccessToken } = require('twilio').jwt;

const { VideoGrant } = AccessToken;
module.exports = {
  getToken: (req, res) => {
    const token = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY,
      process.env.TWILIO_API_SECRET,
    );

    // Assign the generated identity to the token
    token.identity = req.query.id;
    const grant = new VideoGrant({ room: req.query.packname });
    // Grant token access to the Video API features
    token.addGrant(grant);

    // Serialize the token to a JWT string and include it in a JSON response
    res.send({
      identity: req.query.username,
      token: token.toJwt(),
    });
  },
};
