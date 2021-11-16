const Project = require("../models/project");

module.exports = {


    retrieveProject : async (req, res, next) => {
        const allProject = await Project.find({});
        await console.log(allProject);
        res.locals.toConvert = allProject;   // On cale allProject dans la variable locale "toConvertJSON". Cette variable est ensuite utilisée dans la middleware
        next(); 
     },

     selectedProject : async(req, res, next) => {
        const idProject = req.params.id;                    // on récupère le paramètre de l'id appelé 
        const chosenProject = await Project.findById(idProject)
        res.locals.toConvert = chosenProject;
        next();
    },

    convertJSON : (req, res) => {
        const properJSONObject = res.locals.toConvert;
        console.log(properJSONObject);
        res.json(properJSONObject);
    } 

};

