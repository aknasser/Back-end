const Inspiration = require("../models/inspiration");

module.exports = {


    retrieveInspiration : async (req, res, next) => {
        const allInspiration = await Inspiration.find({});
        await console.log(allInspiration);
        res.locals.toConvert = allInspiration;   // On cale allInspiration dans la variable locale "toConvertJSON". Cette variable est ensuite utilisée dans la middleware
        next(); 
     }, 

    convertJSON : (req, res) => {
        const properJSONObject = res.locals.toConvert;
        console.log(properJSONObject);
        res.json(properJSONObject);
    } 

};

