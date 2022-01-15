const router = require("express").Router();  // On dit à express : "voilà, c'est ici qu'on gère les routes"
const cors = require("cors");
require("dotenv").config()



const prospect = require("./prospectRoutes");
const blog = require("./blogRoutes")
const project = require("./projectRoutes");
const inspiration = require("./inspirationRoutes");
const user = require("./userRoutes");

// CORS OPTIONS AND SETTINGS
const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
  : []

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },

  credentials: true,
  exposedHeaders: ["set-cookie"],
}



router.use(cors(corsOptions)); // allow us to bypass the CORS restriction when we connect the front-end(React) to the back (NodeJS)




router.use("/prospect", prospect); 
router.use("/blog", blog); 
router.use("/project", project); 
router.use("/inspiration", inspiration); 
router.use("/user", user);



module.exports = router;
