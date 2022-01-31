const passport = require("passport")
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("../models/user")

// Enable envir Variable (go check the file called .env)
require("dotenv").config() 

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "jdhdhd-kjfjdhrhrerj-uurhr-jjge";
/* opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'nassmassa.com';
 */

passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      // Check against the DB only if necessary.
      // This can be avoided if you don't want to fetch user details in each request.
      console.log(`SHOW ME THE JWT : ${jwt_payload._id}`);
      User.findById(jwt_payload._id, function (err, user) {
        if (err) {
            console.log("dodo")
          return done(err, false)
        }
        if (user) {
            console.log("dodo")
          return done(null, user)
        } else {
            console.log("dodo");
          return done(null, false)
          // or you could create a new account
        }
      })
    })
  )


// WEBSITE TO CHECK THE TOKEN : https://jwt.io/#debugger-io