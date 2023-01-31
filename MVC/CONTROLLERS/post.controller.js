const express=require("express")

//--schema importing---//
const User=require("../MODELS/user.model")

const Post=require("../MODELS/post.model")

const Comment=require("../MODELS/comment.model")

const postrouter=express.Router();


//---------------------------------for post data---------------------------------------------

//get post data
postrouter.get("/",async(req,res)=>{
    try {
        // const posts=await Post.find().populate("userId").lean().exec()
         //populate function ask to mongoose that for this userid we need to document this user data and there we get all data with user id ....user id came as a default value

        // const posts=await Post.find().populate({path:"userId", select:[firstname,email]}).lean().exec() 
        //in this path and select syntax we write select data in an array and here mongoose _id came automaticlly.......but if we write in an object and write _id:0 then it delete the id ..

        const posts=await Post.find().populate({path:"userId", select:{firstname:1,email:1,_id:0}}).lean().exec() 
 return res.status(200).send({findpost:posts})
    } catch (error) {
        return res.status(500).send({messeage:error.message})
        
    }
})

//post post data
postrouter.post("/",async(req,res)=>{
    try {
        const post=await Post.create(req.body)
        return res.status(200).send({findpost:post})
    } catch (error) {
        return res.status(500).send({messeage:error.message})
        
    }
})

//get post by their id

postrouter.get("/:id",async(req,res)=>{
    try {
        const  post=await Post.findById(req.params.id).lean().exec();
        return res.status(200).send({getpostbyid:post})
    } catch (error) {
        return res.status(500).send({messeage:error.message})
        
    }
})


//post update 

postrouter.patch("/:id",async(req,res)=>{
    try {
        const  post=await Post.findByIdAndUpdate(req.params.id,req.body).lean().exec();
        return res.status(200).send({updatepostbyid:post})
    } catch (error) {
        return res.status(500).send({messeage:error.message})
        
    }
})


//post deleted 

postrouter.delete("/:id",async(req,res)=>{
    try {
        const  post=await Post.findByIdAndDelete(req.params.id,req.body).lean().exec();
        return res.status(200).send({deletepostbyid:post})
    } catch (error) {
        return res.status(500).send({messeage:error.message})
        
    }
})


//how to get all command in a post//
postrouter.get("/:postId/comments",async(req,res)=>{
    try {
        const comments=await Comment.find({postId:req.params.postId}).lean().exec();

        return res.status(200).send(comments);
    } catch (error) {
        return res.status(500).send({message:error.message});
        
    }
})


module.exports=postrouter;