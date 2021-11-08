const Project = require("../models/project");

module.exports = {


    retrieveProject : async (req, res, next) => {
        const allProject = await Project.find({});
        await console.log(allProject);
        res.locals.toConvert = allProject;   // On cale allProject dans la variable locale "toConvertJSON". Cette variable est ensuite utilisée dans la middleware
        next(); 
     }, 

    convertJSON : (req, res) => {
        const properJSONObject = res.locals.toConvert;
        console.log(properJSONObject);
        res.json(properJSONObject);
    } 

};

