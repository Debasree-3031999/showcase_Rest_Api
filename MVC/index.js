const express=require("express");
const connect = require("./configs/db")

//--------importing module----------//
const User=require("./MODELS/user.model")
const Post=require("./MODELS/post.model")
const Comment=require("./MODELS/comment.model")
//----------importing controllers----//
const userController=require("./CONTROLLERS/user.controller")
const postController=require("./CONTROLLERS/post.controller")
const commentController=require("./CONTROLLERS/comment.controller")

const app=express();
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/user",userController)
app.use("/post",postController)
app.use("/comment",commentController)
//CRUD OPERATION
//GET=> getting data from the server 
//POST=>adding data to the server
//PUT=>updating data from server
//DELETE=>deleting data from server
app.listen(5000, async()=>{
    try {
        
        await connect();
         
    } catch (error) {
    }
    console.log("listening on port http://localhost:5000")
})

