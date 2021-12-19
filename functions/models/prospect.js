const mongoose = require("mongoose"); // nécessaire pour connecter facilement à MongoDB



const {Schema} = mongoose;    //Assigne le Schema à une constante portant le même nom dans Mongoose.

const prospectSchema = new Schema(
    {
        prenom: {
            type: String,
            required: true,
            lowercase: true
        },
        nom: {
            type: String,
            required: true,
            lowercase: true
        },
        demande: {
            type: String,
            required: true
        },
        activite: {
            type: String,
            required: true
        },
        numero: {
            type: String,
            required: true
        },
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
 




// Pour exporter le model dans les autres composants de notre APP

module.exports = mongoose.model("Prospect", prospectSchema);      