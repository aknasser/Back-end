const router = require("express").Router();
const inspirationController = require("../controllers/inspirationController");



// R DU CRUD POUR PROSPECT
router.get("/random",  inspirationController.retrieveInspiration, inspirationController.randomInspiration, inspirationController.convertJSON)  
router.get("/",  inspirationController.retrieveInspiration, inspirationController.convertJSON)  

router.post("/create", inspirationController.newInspiration);



module.exports = router;