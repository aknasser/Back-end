const mongoose = require("mongoose"); // nécessaire pour connecter facilement à MongoDB



const {Schema} = mongoose;    //Assigne le Schema à une constante portant le même nom dans Mongoose.

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            lowercase: true
        },
        subtitle: {
            type: String,
            required: true,
            lowercase: true
        },
        heroPicture: {
            type: String,
            required: true
        },
        keywords: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
    
);
 




// Pour exporter le model dans les autres composants de notre APP

module.exports = mongoose.model("Blog", blogSchema);      