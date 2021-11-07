const router = require("express").Router();
const blogController = require("../controllers/blogController");


// LES ROUTES PROPRES AU INTERACTION DATA DU VISITEUR
router.post("/", blogController.home);  // HOMEPAGE 





module.exports = router;