const Inspiration = require("../models/inspiration");

module.exports = {

    bypassCors : (req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
    },

    retrieveInspiration : async (req, res, next) => {
        const allInspiration = await Inspiration.find({});
        res.locals.toConvert = allInspiration;   // On cale allInspiration dans la variable locale "toConvertJSON". Cette variable est ensuite utilisée dans la middleware
        next(); 
     },
     
    randomInspiration : async (req, res, next) => {
        const nmbreInspiration = await res.locals.toConvert.length;
        const randomNumber = await Math.floor(Math.random() * nmbreInspiration);
        const inspirationAleatoire = await Inspiration.findOne({}).skip(randomNumber);
        console.log(`nmbreInspiration :${inspirationAleatoire}`);
        res.locals.toConvert = inspirationAleatoire;
        next(); 
    },  

    convertJSON : (req, res) => {
        const properJSONObject = res.locals.toConvert;
        res.json(properJSONObject);
    } 

};

