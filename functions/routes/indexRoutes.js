const router = require("express").Router();  // On dit à express : "voilà, c'est ici qu'on gère les routes"
const cors = require("cors");


const blog = require("../routes/blogRoutes");
const  prospect = require("../routes/prospectRoutes");
const project = require("../routes/projectRoutes");
const  inspiration = require("../routes/inspirationRoutes");


router.use(cors()); // allow us to bypass the CORS restriction when we connect the front-end(React) to the back (NodeJS)


router.use("/prospect", prospect); 
router.use("/blog", blog); 
router.use("/project", project); 
router.use("/inspiration", inspiration); 

module.exports = router;