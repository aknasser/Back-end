const Blog = require("../models/blog");

module.exports = {


    retrieveBlog : async (req, res, next) => {
        const allBlog = await Blog.find({});
        res.locals.toConvert = allBlog;   // On cale allBlog dans la variable locale "toConvertJSON". Cette variable est ensuite utilisée dans la middleware
        next(); 
     }, 

    selectedArticle : async(req, res, next) => {
        const idArticle = req.params.id;                    // on récupère le paramètre de l'id appelé 
        const chosenArticle = await Blog.findById(idArticle)
        res.locals.toConvert = chosenArticle;
        next();
    },

    newArticle : async(req, res) => {
        const newArticle = req.body;
        console.log(`le titre de l'article : ${newArticle.title}`)
        
        const newEntry = await Blog.create({
            title : newArticle.title,
            subtitle : newArticle.subtitle,
            heroPicture : newArticle.heroPicture,
            keywords : newArticle.keywords,
            content : newArticle.content,
        })
    },

    convertJSON : (req, res) => {
        const properJSONObject = res.locals.toConvert;
        res.json(properJSONObject);
    } 

};

