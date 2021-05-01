var express = require("express");
var router = express.Router();
const {getUserById,donated} = require("../Controller/donationController");
const {isSignedin,isAuthenticated} =require("../Controller/userController");

router.param( "userId", getUserById);

router.post("/donate/:userId", isSignedin,isAuthenticated, donated);

module.exports = router;