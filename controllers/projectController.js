const Project = require("../models/project");

module.exports = {


    retrieveProject : async (req, res, next) => {
        const allProject = await Project.find({});
        res.locals.toConvert = allProject;   // On cale allProject dans la variable locale "toConvertJSON". Cette variable est ensuite utilisée dans la middleware
        next(); 
     },

     selectedProject : async(req, res, next) => {
        const idProject = req.params.id;                    // on récupère le paramètre de l'id appelé 
        const chosenProject = await Project.findById(idProject)
        res.locals.toConvert = chosenProject;
        next();
    },

    newProject : async(req, res) => {
        const newProject = req.body;
        console.log(`le titre du projet : ${newProject.title}`)
        
        const newEntry = await Project.create({
            title : newProject.title,
            picture : newProject.picture,
            link : newProject.link,
            description : newProject.description
        })
    },


    convertJSON : (req, res) => {
        const properJSONObject = res.locals.toConvert;
        res.json(properJSONObject);
    } 

};

