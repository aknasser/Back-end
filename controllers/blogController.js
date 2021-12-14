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
        console.log(`ARTICLE SELECTIONNE : ${chosenArticle}`);
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

    updatedArticle : async(req, res) => {
        let articleUpdated = req.body
        console.log(`Le title de'article updaté : ${articleUpdated.title}`);
        let objectId = req.params.id;
        console.log(`L'id: ${objectId}`);

        const entryToUpdate = await Blog.findByIdAndUpdate(objectId, {
            $set : {
                title : articleUpdated.title,
                subtitle : articleUpdated.subtitle,
                heroPicture : articleUpdated.heroPicture,
                keywords : articleUpdated.keywords,
                content : articleUpdated.content,
            },
        },
        {new : true}
        )
        console.log(`la nouvelle entrée : ${entryToUpdate}`)
    },

    deletedObject : async(req, res) => {
        const targetId = req.params.id;
        console.log(`ID de l'élément à supprimer : ${targetId}`);
        const entryToDelete = await Blog.findByIdAndRemove(targetId);
    },

    filteredSearch : async(req, res, next) => {
        const wordsSearched = req.params.filter;
        console.log(`WORDS SEARCHED : ${wordsSearched}`);
        const contentToRetrieve = await Blog.find({content : {"$regex" : wordsSearched, "$options" : "i"}});  // We use a regular expressions to find the array containing the value of  wordSearched
        console.log(`CONTENT TO RETRIEVE : ${contentToRetrieve}`);
        res.locals.toConvert = contentToRetrieve;
        next()
    },


    convertJSON : (req, res) => {
        const properJSONObject = res.locals.toConvert;
        res.json(properJSONObject);
    } 

};

