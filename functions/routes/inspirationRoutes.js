const router = require("express").Router();  // On dit à express : "voilà, c'est ici qu'on gère les routes"
const inspirationController = require("../controllers/inspirationController");

// R DU CRUD
router.get("/random",  inspirationController.retrieveInspiration, inspirationController.randomInspiration, inspirationController.convertJSON);  
router.get("/",  inspirationController.retrieveInspiration, inspirationController.convertJSON);  

// C DU CRUD
router.post("/create", inspirationController.newInspiration);

// U DU CRUD
router.get("/update/:id", inspirationController.selectedInspiration, inspirationController.convertJSON);
router.post("/update/:id", inspirationController.updatedInspiration);


// D DU CRUD
router.delete("/delete/:id", inspirationController.deletedObject);




router.get("/entry", inspirationController.testEntry);

module.exports = router;