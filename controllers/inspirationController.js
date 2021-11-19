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

    newInspiration : async(req, res) => {
        const newArticle = req.body;
        console.log(`le titre du projet : ${newArticle.title}`)
        
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

