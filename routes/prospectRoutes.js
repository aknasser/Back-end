const router = require("express").Router();
const prospectController = require("../controllers/prospectController");


// R DU CRUD POUR PROSPECT
router.get("/",  prospectController.retrieveProspect, prospectController.convertJSON)  


// C DU CRUD
router.post("/", prospectController.newProspect);

// U DU CRUD
router.get("/update/:id", prospectController.selectedProspect, prospectController.convertJSON);

 



module.exports = router;