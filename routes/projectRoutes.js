const router = require("express").Router();
const projectController = require("../controllers/projectController");


// R DU CRUD POUR PROSPECT
router.get("/",  projectController.retrieveProject, projectController.convertJSON)  

 



module.exports = router;