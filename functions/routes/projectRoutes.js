const router = require("express").Router();  // On dit à express : "voilà, c'est ici qu'on gère les routes"
const projectController = require("../controllers/projectController");

// R DU CRUD 
router.get("/",  projectController.retrieveProject, projectController.convertJSON); 
router.get("/:id",  projectController.selectedProject, projectController.convertJSON);  

// C DU CRUD
 router.post("/create",projectController.newProject);

// U DU CRUD
 router.get("/update/:id",  projectController.selectedProject, projectController.convertJSON);  
 router.post("/update/:id", projectController.updatedProject);

 // D DU CRUD
router.delete("/delete/:id", projectController.deletedObject);




module.exports = router;