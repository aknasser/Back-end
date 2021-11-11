const router = require("express").Router();
const inspirationController = require("../controllers/inspirationController");




// R DU CRUD POUR PROSPECT
router.get("/", inspirationController.bypassCors, inspirationController.retrieveInspiration, inspirationController.randomInspiration, inspirationController.convertJSON)  

 



module.exports = router;