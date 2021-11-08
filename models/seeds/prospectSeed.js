const mongoose = require("mongoose");
const Prospect = require("../prospect");

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/new_website",
    {useNewUrlParser: true} 
);

mongoose.Promise = global.Promise;     // ON PERMET A MONGOOSE D'UTILISER LA VERSION HABITUELLE DES PROMISES


const alimentationProspect = async() => {
    const clean = await Prospect.deleteMany({});
    const testProspect = await Prospect.create({
        prenom : "Nouveaux Détours",
        nom: "nouveauxDetours.png",
        demande : "nouveauxdetours.fr",
        activite: "Un site web orienté business development et création de contenus.",
        numero : 0000010001,
        email : "test@test1.com"
    })
}

alimentationProspect();

