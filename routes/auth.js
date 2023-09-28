const express = require("express");
const router = express.Router();
const { login, signUp } = require("../controllers/auth");

router.post("/signUp", signUp);
router.post("/login", login);

module.exports = router;
