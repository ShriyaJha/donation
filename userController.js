const User = require("../Models/userModel")
const { validationResult } = require("express-validator");
var jwt = require('jsonwebtoken')
var expressJwt= require("express-jwt");

exports.signup=(req,res)=>{    
    // res.json({message:"signup working successfully!"})
    //checking for errors
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(422).send({
            error: errors.array()[0].msg,
            param: errors.array()[0].param
        });
    }
    //checking for duplicate accounts 
    const {email,firstName,lastName,password } = req.body;

    User.findOne({email},(err,user)=>{
        if(user){
            return res.status(400).json({
                error:"Email already exists"
            });
        }

        if(err || err === null ){
            //storing json data
            const user1 = new User(req.body);
            //saving json data from rqst
            user1.save((err,user)=>{
                if(err){
                    return res.status(400).json({
                        error:"NOT able to save user in Database"
                    });
                } 

                res.json({
                    name : user.firstName,
                    email : user.email,
                    id : user._id
                });
            })
        }
        
    })

}

exports.signin =(req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).send({
            error:errors.array()[0].msg
        });
    }
    const {email, password} = req.body;
    User.findOne({email}, (err,user)=>{
        console.log(err,user);
        if (err || !user){
            res.status(400).send({
                error:"User not found"
            });
        }

        //check for password
        if(!user.authenticate(password)){
            return res.status(400).send({
                error:"Email and Password doesn't match"
            });
        }

        //generating JWT token
        const token = jwt.sign({_id : user._id},process.env.SECRET)
        //put in the cookie
        res.cookie("token",token,{expire: new Date() +9999})

        const {firstName, email, _id} = user;
        res.json({
            token,
            user:{
                firstName,
                email,
                _id,
            }
        })
    })
}

exports.signout =(req,res) =>{
    res.clearCookie("token")
    return res.send({
        Msg: "You are successfully signout out..."
    });
}

exports.isSignedin = expressJwt({
    secret: process.env.SECRET,
    algorithms: ['HS256'],
    userProperty: "auth"
})

exports.isAuthenticated =(req,res,next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(400).send({
            Error:"You are not authenticated "
        });
    }
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.SECRET,(err,verified)=>{
        if(err){
            return res.status(403).send({
                Error:"You are not authenticated "
            });
        }
        next();
    })
    
}
