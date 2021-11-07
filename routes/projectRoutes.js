const router = require("express").Router();
const projectController = require("../controllers/projectController");


// LES ROUTES PROPRES AU INTERACTION DATA DU VISITEUR
router.post("/", projectController.home);  // HOMEPAGE 





module.exports = router;