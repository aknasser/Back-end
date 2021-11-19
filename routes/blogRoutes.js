const router = require("express").Router();
const blogController = require("../controllers/blogController");


// R DU CRUD
router.get("/",  blogController.retrieveBlog, blogController.convertJSON);  
router.get("/:id", blogController.selectedArticle, blogController.convertJSON);

// C DU CRUD
router.post("/create", blogController.newArticle);


module.exports = router;