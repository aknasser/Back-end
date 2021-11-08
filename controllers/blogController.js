const Blog = require("../models/blog");

module.exports = {


    retrieveBlog : async (req, res, next) => {
        const allBlog = await Blog.find({});
        await console.log(allBlog);
        res.locals.toConvert = allBlog;   // On cale allBlog dans la variable locale "toConvertJSON". Cette variable est ensuite utilisée dans la middleware
        next(); 
     }, 

    convertJSON : (req, res) => {
        const properJSONObject = res.locals.toConvert;
        console.log(properJSONObject);
        res.json(properJSONObject);
    } 

};

