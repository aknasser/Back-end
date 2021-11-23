const Prospect = require("../models/prospect");

module.exports = {


    retrieveProspect : async (req, res, next) => {
        const allProspect = await Prospect.find({});
        res.locals.toConvert = allProspect;   // On cale allProspect dans la variable locale "toConvertJSON". Cette variable est ensuite utilisée dans la middleware
        next(); 
     },

    selectedProspect : async(req, res, next) => {
        const idProspect = req.params.id;                    // on récupère le paramètre de l'id appelé 
        const chosenProspect = await Prospect.findById(idProspect)
        res.locals.toConvert = chosenProspect;
        next();
    },

     
    newProspect : async(req, res) => {
        const lead = req.body;
        console.log(`la valeur de lead : ${lead.email}`)
        
        const newEntry = await Prospect.create({
            prenom : lead.prenom,
            nom : lead.nom,
            demande : lead.demande,
            activite : lead.activite,
            numero : lead.numero,
            email : lead.email
        })
    },


    updatedProspect : async(req, res) => {
        let prospectUpdated = req.body
        console.log(`Le nom du prospect updaté : ${prospectUpdated.title}`);
        let objectId = req.params.id;
        console.log(`L'id: ${objectId}`);

        const entryToUpdate = await Prospect.findByIdAndUpdate(objectId, {
            $set : {
                prenom : prospectUpdated.prenom,
                nom : prospectUpdated.nom,
                demande : prospectUpdated.demande,
                activite : prospectUpdated.activite,
                numero : prospectUpdated.numero,
                email : prospectUpdated.email,
            },
        },
        {new : true}
        )
        console.log(`la nouvelle entrée : ${entryToUpdate}`)
    },

    deletedObject : async(req, res) => {
        const targetId = req.params.id;
        console.log(`ID de l'élément à supprimer : ${targetId}`);
        const entryToDelete = await Prospect.findByIdAndRemove(targetId);
    },


    convertJSON : (req, res) => {
        const properJSONObject = res.locals.toConvert;
        res.json(properJSONObject);
    } 

};

