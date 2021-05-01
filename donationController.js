const User = require("../Models/userModel");
const Donation = require("../Models/donationModel");
var temp ; 

exports.getUserById = (req,res,next,id) =>{
    User.findById(id, (err, user)=>{
        if(err || !user){
            return res.status(401).json({
                error:"User Not Found"
            });
        }
        req.profile= user;
        temp = req.profile;
        next();
    })
}

exports.donated = (req,res,next) =>{
    const donate = new Donation(req.body);

    donate.save((err,donate)=>{
        if(err){
            return res.status().json({
                error:"Unable to Donate"
            });
        }
        res.json(donate)
    })

}

/*exports.donater = (req,res) =>{
    User.findOne(temp).exec((err,user)=>{
        if(err){
            return res.status(400).json({
                error: "User not found"
            });
        }
       let amount = user.donated + req.body.amount;
       user.save({user.donated:amount}).exec((err,user)=>{
               if(err){
                return res.status(401).json({
                    error:"Updating Failed"
                });
               }
            return res.json({
                donated: user.donated
            })
           }
       )
    })
}*/