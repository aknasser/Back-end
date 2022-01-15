const router = require("express").Router();
const userController = require("../controllers/userController");
const passport = require("passport")
const { getToken, COOKIE_OPTIONS, getRefreshToken, verifyUser } = require("../authenticate")




router.post("/signup", userController.signUp);

// LEVEL1 - WIth passport.authenticate("local"), we check if the credentials posted by the user are correct(username and password)
// LEVEL2 - JWT authorization, we set a new token and refreshToken for the session initialised by the user. 
router.post("/login",passport.authenticate("local"), userController.login);


module.exports = router;