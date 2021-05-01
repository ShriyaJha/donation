var mongoose = require("mongoose");
const schema = mongoose.Schema; 
const { ObjectId} = schema;

var donationSchema = new schema({
    amount:{
        type:Number,
        trim:true,
        required:true
    },
    user:{
        type:ObjectId,
        ref:"User"
    }
},{timestamps:true})

module.exports = mongoose.model("Donation", donationSchema)