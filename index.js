// LES MODULES NECESSAIRES DE BASE

const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy; 
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const passwordCookie = "motdepasse_hard" + Math.random();
const router = require("./routes/indexRoutes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const User = require("./models/user");  // Seulement utile pour accéder à la partie admin dans notre cas

require("dotenv").config()



// LE SERVER
const app = express();
app.use(express.static("public")); 

// PORT DE L'APPLICATION
app.set("port", process.env.PORT || 1993);   // Si l'environnement ne définit pas de valeur spécifique alors PORT= 1993


// PREPARER A ECOUTER LE SERVEUR

const server = app.listen(app.get("port"), () => {
    console.log(`Nous sommes connectés au port ${app.get("port")}`);
});


// CONNECTION A LA DB

mongoose.connect(/* process.env.MONGODB_URI || */ "mongodb://localhost:27017/new_website",        // Ainsi Mongoose en utilisant les variables de l'environnement ou le cas échéant à l'adresse local de la DB
    {useNewUrlParser: true},
    {useUnifiedTopology: true},
    {useCreateIndex: true},
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



/* app.use(expressSession({                      // nous disons à expressSession d'utiliser des sessions et de recourir à cookie-parser comme methode de storage
    secret: passwordCookie,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24                         // durée avant expiration des cookies : 1 journée
    },
    resave: false,                              // Pour ne pas envoyer de cookie à l'user si la session ne bouge pas
    saveUninitialized: false              // Pour éviter d'updater les datas de la session si rien n'a changé dans la session actuelle.
})); */



/* // INITIALISER PASSPORT.JS (Après le cookieParser)
app.use(passport.session()); */



app.use((req, res, next) => {                          // Nous utilisons cette middleware pour passer des variables locales aux vues. Ces variables seront utiles dans le layout.ejs (bouton login/log out)
    res.locals.loggedIn = req.isAuthenticated();       // isAuthentficated est une method propre à passport.js. Elle renvoie vrai ou faux. Elle nous indique si les datas d'un user sont actuellement présente dans les sessions cookies de la requête. En d'autres termes, si un user est connecté, isAuthentificated, renvoie "Vrai" 
    res.locals.currentUser = req.user;              // Si un user existe bien, nous pouvons l'attribuer à une variable que nous voulons (ici currentUser)
    next();
});


// POUR LIRE LES DATAS POSTEES PAR USER

app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());





// IMPORTATION ET GESTION DES ROUTES.

app.use("/", router);

