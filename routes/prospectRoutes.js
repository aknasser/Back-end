const router = require("express").Router();
const prospectController = require("../controllers/prospectController");


// R DU CRUD POUR PROSPECT
router.get("/",  prospectController.retrieveProspect, prospectController.convertJSON)  

 



module.exports = router;