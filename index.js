const express=require("express")
const bodyParser=require("body-parser")
const mongoose=require("mongoose")
var {movieModel}=require("./model/movie")
var app=express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
mongoose.connect("mongodb+srv://megha:test123@cluster0.crp2x.mongodb.net/moviedb?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true});
app.post('/movieadd',async(req,res)=>{
    try{
        var data=req.body;
        var movieData=new movieModel(data);
        var result=await movieData.save();
        res.json(result);

    }
    catch(error){
        res.status(500).send(error)

    }

})
app.get("/viewall",async(req,res)=>{
    try{
        var result=await movieModel.find().exec();
        res.json(result);

    }
    catch(error){
        res.status(500).send(error)

    }
})
app.post("/search",(req,res)=>{
    try{
        movieModel.find(req.body,(error,data)=>{
            if(error){
                throw error;
            }
            else{
                res.json(data)
            }
        })

    }
    catch(error){
        res.status(500).send(error)

    }
})
app.post("/delete",async(req,res)=>{
    try{
        movieModel.findByIdAndDelete(req.body.id,(error,data)=>{
            if(error){
                res.send(error)
            }
            else{
                res.json({'status':'success'})
            }
        })

    }
    catch{
        res.status(500).send(error)

    }
})
app.post("/update",async(req,res)=>{
    try{
        movieModel.findByIdAndUpdate(req.body.id,
            {
                moviename:req.body.moviename,
                actor:req.body.actor,
                actress:req.body.actress,
                director:req.body.director,
                camera:req.body.camera,
                yearofrelease:req.body.yearofrelease,
            },(error,data)=>{
                if(error){
                    throw error
                }
                else{
                    res.json({'status':'success'})
                }
            })
            

    }
    catch(error){
        res.status(500).send(error) 
    }
})
app.listen(process.env.PORT || 3000,function(){
    console.log("Your node js server is running")
})
