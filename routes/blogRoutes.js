const router = require("express").Router();
const blogController = require("../controllers/blogController");


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