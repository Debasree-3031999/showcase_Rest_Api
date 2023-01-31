const mongoose=require("mongoose")

//POST SCHEMA

//creating the  post Schema:-step=1
const postSchema=new mongoose.Schema(
    {
        title:{type:String,required:true},
        body:{type:String,required:true},
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        },
    },
    {
        versionKey:false,
        timestamps:true,
    }

)

//creating the post model=step-2

const Post=mongoose.model("post",postSchema)

module.exports=Post