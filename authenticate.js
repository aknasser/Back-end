const passport = require("passport")
const jwt = require("jsonwebtoken")
const dev = process.env.NODE_ENV !== "production"

// Enable envir Variable (go check the file called .env)
require("dotenv").config() 


//COOKIE_OPTIONS is used for creating the refresh token cookie, which should be httpOnly and secure so that it cannot be read by the client javascript. SameSite is set to "None" since client and server will be in different domains.

exports.COOKIE_OPTIONS = {
/*   httpOnly: true,
 */  // Since localhost is not having https protocol,
  // secure cookies do not work correctly (in postman)
  secure: false,
  signed: true,
  maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
  sameSite: "none",
}


//getToken is used to create the JWT.

exports.getToken = user => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: eval(process.env.SESSION_EXPIRY),
  })
}


// getRefreshToken is used to create the refresh token, which itself is a JWT.

exports.getRefreshToken = user => {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY),
  })
  return refreshToken
}


//verifyUser is a middleware that needs to be called for every authenticated request.

exports.verifyUser = passport.authenticate("jwt", { session: false })


// understand authenticate : https://www.passportjs.org/docs/authenticate/
