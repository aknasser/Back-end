const Prospect = require("../models/prospect");

module.exports = {


    retrieveProspect : async (req, res, next) => {
        const allProspect = await Prospect.find({});
        await console.log(allProspect);
        res.locals.toConvert = allProspect;   // On cale allProspect dans la variable locale "toConvertJSON". Cette variable est ensuite utilisée dans la middleware
        next(); 
     }, 

    convertJSON : (req, res) => {
        const properJSONObject = res.locals.toConvert;
        console.log(properJSONObject);
        res.json(properJSONObject);
    } 

};

