const jwt = require('jsonwebtoken');
require('dotenv').config();

//auth
exports.auth = (req,res, next) => {
    try{
        //extract JWT token
        //PENDING : other ways to fetch token
        // console.log("cookie" , req.cookies.token);
        // console.log("body" , req.body.token);
        // console.log("header", req.header("Authorization"));
       
        const token = req.cookies.token
                      || req.body.token 
                      || req.header("Authorization").replace("Bearer ", "");
        
        if(!token || token === undefined) {
            return res.status(401).json({
                success:false,
                message:'Token Missing',
            });
        }
        //verify the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            //why this ?
            req.user = decode;
        } catch(error) {
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    } 
    catch(error) {
        return res.status(401).json({
            success:false,
            message:'Something went wrong, while verifying the token',
            error:error.message,
        });
    }  
}
//participant
exports.isParticipant = (req,res,next) => {
    try{
            if(req.user.accountType !== "Participant") {
                return res.status(401).json({
                    success:false,
                    message:'THis is a protected route for Participant',
                });
            }
            next();
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'User Role is not matching',
        });
    }
}

//isOrganizer
exports.isOrganizer = (req,res,next) => {
    try{
            if(req.user.accountType !== "Organizer") {
                return res.status(401).json({
                    success:false,
                    message:'THis is a protected route for students',
                });
            }
            next();
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'User Role is not matching',
        });
    }
}

//isAdmin
exports.isAdmin = (req,res,next) => {
    try{
            if(req.user.accountType !== "Admin") {
                return res.status(401).json({
                    success:false,
                    message:'THis is a protected route for Admin',
                });
            }
            next();
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'User Role is not matching',
        });
    }
}
