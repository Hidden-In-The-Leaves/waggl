const express = require("express");
const { getMessage } = require("../controllers/messageController.js");

const router = express.Router();

router.route("/").get(getMessage);

module.exports = router;
