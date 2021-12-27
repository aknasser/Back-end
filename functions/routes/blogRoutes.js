const router = require("express").Router();  // On dit à express : "voilà, c'est ici qu'on gère les routes"
const blogController = require("../controllers/blogController");



// FILTERED SEARCH
router.get("/search/:filter", blogController.filteredSearch, blogController.convertJSON);

// R DU CRUD
router.get("/",  blogController.retrieveBlog, blogController.convertJSON);  
router.get("/:id", blogController.selectedArticle, blogController.convertJSON);

// C DU CRUD
router.post("/create", blogController.newArticle);

//U DU CRUD
router.post("/update/:id", blogController.updatedArticle);

// D du CRUD
router.delete("/delete/:id", blogController.deletedObject);



module.exports = router;