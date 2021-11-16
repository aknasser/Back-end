const router = require("express").Router();
const blogController = require("../controllers/blogController");


// R DU CRUD POUR PROSPECT
router.get("/",  blogController.retrieveBlog, blogController.convertJSON);  
router.get("/:id", blogController.selectedArticle, blogController.convertJSON);
 



module.exports = router;