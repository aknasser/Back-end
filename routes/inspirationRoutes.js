const router = require("express").Router();
const inspirationController = require("../controllers/inspirationController");


// LES ROUTES PROPRES AU INTERACTION DATA DU VISITEUR
router.post("/", inspirationController.home);  // HOMEPAGE 





module.exports = router;