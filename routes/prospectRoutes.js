const router = require("express").Router();
const prospectController = require("../controllers/prospectController");


// LES ROUTES PROPRES AU INTERACTION DATA DU VISITEUR
router.post("/", prospectController.home);  // HOMEPAGE 





module.exports = router;