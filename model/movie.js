const mongoose=require("mongoose");
const movieSchema=new mongoose.Schema(
    {
        moviename:{type:String},
        actor:{type:String},
        actress:{type:String},
        director:{type:String},
        camera:{type:String},
        yearofrelease:{type:Number},
        
        
});
var movieModel=mongoose.model('movie',movieSchema);
module.exports={movieModel}