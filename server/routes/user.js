// functions:
// const { signup, login } = require("../controllers/user.js");
const userController = require("../controllers/user");

const express = require("express");
const router = express.Router();

router.post('/login', userController.login)
router.post('/signup', userController.signup)

module.exports = router;
