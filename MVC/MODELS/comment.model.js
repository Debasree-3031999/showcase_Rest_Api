const mongoose=require("mongoose")

//COMMENT SCHEMA

//step-1:-creating the schema
const commentSchema= new mongoose.Schema({
    body:{type:String,required:true},

    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post",
        required:true,
    },
    
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user ",
        required:true,
    },
},
{
    timestamps:true,
}

);

//step-2:-creating the model
const Comment=mongoose.model("comment",commentSchema)//comment=>comments


module.exports=Comment