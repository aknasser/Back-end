const Blog = require("../models/blog");

module.exports = {


    retrieveBlog : async (req, res, next) => {
        const allBlog = await Blog.find({});
        await console.log(allBlog);
        res.locals.toConvert = allBlog;   // On cale allBlog dans la variable locale "toConvertJSON". Cette variable est ensuite utilisée dans la middleware
        next(); 
     }, 

    selectedArticle : async(req, res, next) => {
        const idArticle = req.params.id;                    // on récupère le paramètre de l'id appelé 
        const chosenArticle = await Blog.findById(idArticle)
        res.locals.toConvert = chosenArticle;
        next();
    },
    convertJSON : (req, res) => {
        const properJSONObject = res.locals.toConvert;
        console.log(properJSONObject);
        res.json(properJSONObject);
    } 

};

