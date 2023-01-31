const mongoose=require("mongoose")

//USER SCHEMA

//Step-1:- creating the Schema

const userSchema=new mongoose.Schema({
    firstname:{type:String,required:true},

    lastname:{type:String,required:false},

    email:{type:String,required:true,unique:true},

    password:{type:String,required:true},
},
{
    versionKey:false,
    timestamps:true,
}


)

//step-2:- creating model

const User=mongoose.model("user",userSchema);

module.exports=User