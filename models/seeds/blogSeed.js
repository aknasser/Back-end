const mongoose = require("mongoose");
const Blog = require("../blog");

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/new_website",
    {useNewUrlParser: true} 
);

mongoose.Promise = global.Promise;     // ON PERMET A MONGOOSE D'UTILISER LA VERSION HABITUELLE DES PROMISES


const alimentationBlog = async() => {
    const clean = await Blog.deleteMany({});
    const firstArticle = await Blog.create({
        title : "5 raisons de créer du contenu en BtoB",
        subtitle:"5 raisons de s'y mettre. Maintenant." ,
        heroPicture: "unEcran.png",
        keywords : ["Content Marketing", "Nouveaux Détours", "BtoB"],
        content: "Tu le sais, le contenu est ROI. Et son règne ne fait que commencer...Blabla"
    })

    const secondArticle = await Blog.create({
        title : "Pourquoi trouver sa Vision est Indispensable",
        subtitle:"C'est quoi le projet" ,
        heroPicture: "timonier.png",
        keywords : ["Vision", "Stratégie", "BtoB"],
        content: "Pour durer en tant qu'entrepreneur, trouver sa vision est plus que jamais indispensable. Blablabla"
    })

    const thirdArticle = await Blog.create({
        title : "Optimiser sa stratégie de Contenu: Less is more",
        subtitle:"La quantité plutôt que la qualité" ,
        heroPicture: "lessIsMore.png",
        keywords : ["Content Marketing", "Stratégie", "BtoB", "BtoC"],
        content: "Ton contenu laisse ton audience de marbre ? Et si tu optais pour le 'Less is More' ?...Blabla"
    })
}

alimentationBlog();

