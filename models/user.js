const mongoose = require("mongoose"); // nécessaire pour connecter facilement à MongoDB


const passportLocalMongoose = require("passport-local-mongoose");   //Pour utiliser librement userSchema.plugin (juste en dessous)



const {Schema} = mongoose;    //Assigne le Schema à une constante portant le même nom dans Mongoose.


const Session = new Schema({        // This schema enable us to store the refreshToken later.
    refreshToken: {
      type: String,
      default: "",
    },
  })

const userSchema = new Schema(
    {
        name : {
            type: String,
            required: true,
        },
        username  : {
                type: String,
                unique: true,
                required: true,
                lowercase: true
        },
        authStrategy : {
            type : String,
            default: "local"
        },
        refreshToken: {
            type: [Session],             // allude to Session defined a bit higher. IMPORTANT : For refresh token, we use an array to support login from different devices ;)
        },

    },
    {
        timestamps: true
    }    
);
 
//SECURITY : Remove refreshToken from the response.We remove the refresh token from the toJSON function, so that we don't expose user's refresh tokens whenever we serialize the model and send the data in the API response. 
userSchema.set("toJSON", {
    transform: function (doc, ret, options) {
      delete ret.refreshToken;
      return ret;
    },
  })


// Avec ce plugin, nous indiquons que nous utilisons passportLocalMongoose pour hasher et stocker les data (et du coup plus besoin de password dans le model Schema)
userSchema.plugin(passportLocalMongoose);



// Pour exporter le model dans les autres composants de notre APP

module.exports = mongoose.model("User", userSchema);      