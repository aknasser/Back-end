const Inspiration = require("../models/inspiration");


module.exports = {



    retrieveInspiration : async (req, res, next) => {
        const allInspiration = await Inspiration.find({});
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
    },



    convertJSON : (req, res) => {
        const properJSONObject = res.locals.toConvert;
        res.json(properJSONObject);
    } 

};

