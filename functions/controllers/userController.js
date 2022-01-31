const User = require("../models/user");
const jwt = require("jsonwebtoken");


// To have access to the env variables.
require("dotenv").config()


const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("../authenticate")


module.exports = {

    signUp :  (req, res, next) => {
        // Verify that name is not empty
        if (!req.body.name) {
            res.statusCode = 500
            res.send({
            name: "nameError",
            message: "The name is required my man!",
            })
        } else {
            // register is a method from passport-local-mongoose.
            User.register(                                 
                new User({username : req.body.username, name : req.body.name}),      
                req.body.password,
                (err, user) => {
                    if (err) {
                        res.statusCode = 500;
                        res.send(`Des PBS to register user : ${err}`)
                    } else {
                        // If all gucci, we defined user.name and user.name with the value send to the back during the request.
                        user.name = req.body.name;
                        //We define a new token for  user.
                        const token = getToken({_id: user._id}); 
                        //This same toke is used to get the refreshToken.
                        const refreshToken = getRefreshToken({_id:user._id});
                        // We push the refreshToken in the new user array. (guess what ? this refreshToken will change over time somewhere in my code).
                        user.refreshToken.push({refreshToken});
                        user.save((err, user) => {
                            if (err) {
                                res.statusCode = 500;
                                res.send(err);
                            } else {
                                //While saving the user we send cookie(name, value, options) and some info in the response. enable us to get the token in the front-end.boom. We will use it to define UseContext in React
                                res.send( { success: true, token: token } );     
                         
                            }
                        })
                    }
                }
            )
        } 
        err => next(err)    
    },

    login : async (req, res, next) => {
        //We create a new toKen + new refreshToken
        const token = getToken({_id: req.user._id});   
        const refreshToken = getRefreshToken({_id: req.user._id});
        const userPending = await User.findById(req.user._id);     
        userPending.refreshToken.push({refreshToken});
        
        // We save the user in the DB to update token and refreshToken
        userPending.save((err, user) => {                           
            if (err) {
                res.statusCode = 500;
                res.send(`ERROR SPOTTED DURING THE LOGIN PROCESS :${err}`)
            } else {
                res.statusCode = 200;
                // We send the token in the response. The token is then available for the client.
                res.send({success: true, token : token});
            }
        })
        err => next(err);
    },



};

