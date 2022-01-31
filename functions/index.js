const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions


const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy; 
const mongoose = require("mongoose");
const passwordCookie = "motdepasse_hard" + Math.random();
const router = require("./routes/indexRoutes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const User = require("./models/user");  // Seulement utile pour accéder à la partie admin dans notre cas

require("dotenv").config()
 

// LE SERVER
const app = express();



//  COOKIE PARSER AND SESSION                          

app.use(cookieParser(passwordCookie));   // "motdepasse_hard" est notre mot de passe secret. cookieParser l'utilise pour crypter les data des cookies envoyés. Idéalement ce mot de passe est plus compliqué et représentée par une variable. Ceci évite les failles de sécurité.
app.use(expressSession({                      // nous disons à expressSession d'utiliser des sessions et de recourir à cookie-parser comme methode de storage
    secret: passwordCookie,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24                         // durée avant expiration des cookies : 1 journée
    },
    resave: false,                              // Pour ne pas envoyer de cookie à l'user si la session ne bouge pas
    saveUninitialized: false              // Pour éviter d'updater les datas de la session si rien n'a changé dans la session actuelle.
}));





// CONNECTION A LA DB


/* mongoose.set('useFindAndModify', false);     // Nécessaire pour pouvoir utiliser FindByIdAndUpdate dans les anciennes version. Décommenter si problème avec FindByIdAndUpdate
 */

 mongoose.connect("mongodb+srv://nasser:Akande33@projects22-pri.9ydu0.mongodb.net/new_website?retryWrites=true&w=majority",        // Ainsi Mongoose en utilisant les variables de l'environnement ou le cas échéant à l'adresse local de la DB
    {useNewUrlParser: true}
);

const db = mongoose.connection;

mongoose.Promise = global.Promise

db.once("open", () => {                                                             // Quand db est ouvert, on reçoit ce message sur la console.
    console.log("All Right ! Connexion etablie avec la DB: new_website");
});  

//PASSPORT AND AUTHENTIFICATION STRATEGIES

require("./strategies/JwtStrategy");
require("./strategies/localStrategy");
require("./authenticate");

// PARSING AND COOKIE MANAGEMENT

app.use(bodyParser.json())
app.use(cookieParser(process.env.COOKIE_SECRET))  // cookieParser utilise COOKIE_SECRET pour crypter les datas des cookies envoyés. Idéalement, ce mot de passe est représenté par une variable. Ceci évite les failles de sécurité.


// PASSPORT INITIALISATION

app.use(passport.initialize());



// POUR LIRE LES DATAS POSTEES PAR USER

app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());





app.use("/", router);

exports.app = functions.https.onRequest(app);
