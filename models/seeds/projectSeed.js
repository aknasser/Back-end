const mongoose = require("mongoose");
const Project = require("../project");

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/new_website",
    {useNewUrlParser: true} 
);

mongoose.Promise = global.Promise;     // ON PERMET A MONGOOSE D'UTILISER LA VERSION HABITUELLE DES PROMISES


const alimentationProject = async() => {
    const clean = await Project.deleteMany({});
    const nouveauxDetours = await Project.create({
        title : "Nouveaux Détours",
        picture: "nouveauxDetours.png",
        link : "nouveauxdetours.fr",
        description: "Un site web orienté business development et création de contenus."
    })

    const secondArticle = await Project.create({
        title : "Bofoomi",
        picture: "bofoomi.png",
        link : "https://bofoomi.herokuapp.com/",
        description: "Bofommi. Be better everyday"
    })
}

alimentationProject();

