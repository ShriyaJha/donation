const mongoose = require('mongoose');
require('dotenv').config()
var bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const express = require('express');
const app = express();



//import route files
const  userRoute = require("./Routes/userRoute");
const donationRoute = require("./Routes/donationRoute")

 
const db = 'mongodb://127.0.0.1:27017/database'
//db connection
mongoose.connect(db,{
    useNewUrlParser : true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(() =>{
    console.log("DB CONNECTED....");
}).catch((err) =>{ 
    console.log("FAILED.....",err);
});


//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());

//routes
app.use("/api", userRoute);
app.use("/api", donationRoute);

// port and listening
const PORT = process.env.PORT || 8000;
app.listen(PORT,() =>{
    console.log("Server is UP>......",PORT)
})
