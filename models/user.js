const mongoose = require("mongoose"); // nécessaire pour connecter facilement à MongoDB


const passportLocalMongoose = require("passport-local-mongoose");   //Pour utiliser librement userSchema.plugin (juste en dessous)



const {Schema} = mongoose;    //Assigne le Schema à une constante portant le même nom dans Mongoose.

const userSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true
        }
    },
    {
        timestamps: true
    }
    
);
 


// Avec ce plugin, nous indiquons que nous utilisons passportLocalMongoose pour hasher et stocker les data (et du coup plus besoin de password dans le model Schema)
userSchema.plugin(passportLocalMongoose, {                    
    usernameField: "email"                          // ==> Nous lui disons: "l'email est le parametre de validation au lieu d'username(la valeur par défaut de passport-local-mongoose")
});



// Pour exporter le model dans les autres composants de notre APP

module.exports = mongoose.model("User", userSchema);      