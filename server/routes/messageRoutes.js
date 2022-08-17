const express = require("express");
const {
  getMessage,
  postMessage,
  getGroupMessage,
  postGroupMessage,
  getUserPacks,
  getPackMember,
  getUser,
} = require("../controllers/messageController.js");

const db = require("../../database/postgres.js");

const router = express.Router();

router.route("/").get(getMessage).post(postMessage);
router.route("/group").get(getGroupMessage).post(postGroupMessage);
router.route("/pack").get(getUserPacks);
router.route("/pack/members").get(getPackMember);
router.route("/pack/user").get(getUser);

module.exports = router;
