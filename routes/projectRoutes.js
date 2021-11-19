const router = require("express").Router();
const projectController = require("../controllers/projectController");


// R DU CRUD 
router.get("/",  projectController.retrieveProject, projectController.convertJSON); 
router.get("/:id",  projectController.selectedProject, projectController.convertJSON);  

// C DU CRUD
 router.post("/create",projectController.newProject);



module.exports = router;