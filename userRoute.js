var express = require("express")
var router = express.Router()
const { check } = require("express-validator");

const { signin,signout,signup} = require("../Controller/userController")


router.post("/signup",[
    check("firstName","Name should of minimum 3 letters").isLength({min:3}),
    check("lastName","Name should of minimum 3 letters").isLength({min:3}),
    check("email","Enter an valid email").isEmail(),
    check("password","Pasword must be of minimum 5 letters").isLength({min:5}),
],signup );

//signin
router.post("/signin",[
    check("email","Enter an valid email").isEmail({min:3})
],signin);


//signout
router.get("/signout",signout);


module.exports = router