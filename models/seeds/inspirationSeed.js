const mongoose = require("mongoose");
const Inspiration = require("../inspiration");

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/new_website",
    {useNewUrlParser: true} 
);

mongoose.Promise = global.Promise;     // ON PERMET A MONGOOSE D'UTILISER LA VERSION HABITUELLE DES PROMISES


const alimentationInspiration = async() => {
    const clean = await Inspiration.deleteMany({});
    const firstQuote = await Inspiration.create({
        quote : "Get busy living or get busy dying",
        author : "Stephen King"
    })

    const secondQuote = await Inspiration.create({
        quote : "You only live once, but if you do it right, once is enough.",
        author : "Mae west"
    })

    const thirdQuote = await Inspiration.create({
        quote : "If you want to live a happy life, tie it to a goal, not to people or things",
        author : "Albert Einstein"
    })
}

alimentationInspiration();

