const mongoose = require('mongoose');
require("dotenv").config(); 
exports.connect = ()=>{

        mongoose.connect(process.env.DATABASE_URL,{
            connectTimeoutMS: 60000,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(()=>{console.log(`DATABASE: ${process.env.DATABASE_URL} is connected successfully`)})
        .catch(
            (error)=>{
                console.log(`DATABASE: ${process.env.DATABASE_URL} connection  Failed`)
                console.log(error);
                process.exit(1);
            })

}