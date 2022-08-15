const express = require("express");
const { getMessage } = require("../controllers/messageController.js");

const router = express.Router();

<<<<<<< HEAD
=======
router.route("/").get(getMessage);
>>>>>>> e4818081a1512b41658dcb9abd9a02cf0a589e58

module.exports = router;
