const router = require("express").Router();  // On dit à express : "voilà, c'est ici qu'on gère les routes"


const prospect = require("./prospectRoutes");
const blog = require("./blogRoutes")
const project = require("./projectRoutes");
const inspiration = require("./inspirationRoutes");

router.use("/", prospect); 
router.use("/blog", blog); 
router.use("/project", project); 
router.use("/inspiration", inspiration); 




module.exports = router;
