const Inspiration = require("../models/inspiration");


module.exports = {



    retrieveInspiration : async (req, res, next) => {
        const allInspiration = await Inspiration.find({}).sort({createdAt : -1});
        res.locals.toConvert = allInspiration;   // On cale allInspiration dans la variable locale "toConvertJSON". Cette variable est ensuite utilisée dans la middleware
        next(); 
     },
     
    randomInspiration : async (req, res, next) => {
        const nmbreInspiration = await res.locals.toConvert.length;
        const randomNumber = await Math.floor(Math.random() * nmbreInspiration);
        const inspirationAleatoire = await Inspiration.findOne({}).skip(randomNumber);
        res.locals.toConvert = await inspirationAleatoire;
        next(); 
    },  

    selectedInspiration : async(req, res, next) => {
        const idInspiration = req.params.id;                    // on récupère le paramètre de l'id appelé 
        const chosenInspiration = await Inspiration.findById(idInspiration)
        res.locals.toConvert = chosenInspiration;
        next();
    },

    newInspiration : async(req, res) => {
        const newArticle = req.body;
        console.log(`le titre de la citation : ${newArticle.quote}`)
        
        const newEntry = await Inspiration.create({
            quote : newArticle.quote,
            author : newArticle.author
        })
        res.send("new entry created!");

    },

    updatedInspiration : async(req, res) => {
        let inspirationUpdated = req.body
        console.log(`L'auteur de la citation updaté : ${inspirationUpdated.author}`);
        let objectId = req.params.id;
        console.log(`L'id: ${objectId}`);

        const entryToUpdate = await Inspiration.findByIdAndUpdate(objectId, {
            $set : {
                quote : inspirationUpdated.quote,
                author : inspirationUpdated.author,
            },
        },
        {new : true}
        )
        console.log(`la nouvelle entrée : ${entryToUpdate}`)
        res.send("entry updated!");

    },

    deletedObject : async(req, res) => {
        const targetId = req.params.id;
        console.log(`ID de l'élément à supprimer : ${targetId}`);
        const entryToDelete = await Inspiration.findByIdAndRemove(targetId);
        res.send("entry removed!");
    },


    convertJSON : (req, res) => {
        const properJSONObject = res.locals.toConvert;
        res.json(properJSONObject);
    } 

};

