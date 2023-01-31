
const express=require("express")

//--schema importing---//
const User=require("../MODELS/user.model")

// const Post=require("../MODELS/post.model")

// const Comment=require("../MODELS/comment.model")

const commentrouter=express.Router();



//----------------------COMMENTS CRUD--------------------------------------------------

//get comment

commentrouter.get("/",async(req,res)=>{
    try {
                    const comments=await Comment.find().
                    populate({path:"postId",select:["title"]}).
                    populate({path:"userId",select:["firstname"]})
                    lean().exec(); //we can also write  populate("postId") && populate("userId")

              // ----------------------- //inner populate and outer populate concept--> ex=>when we need userId details in postId then we use this concept || nasted populate//-------------------------//

                // const comments=await Comment.find().
                // populate({
                //            path:"postId",select:["title"],populate:{path:"userId",select:["firstName"]}//this userId firstname show   who was post  
                //         }).
                // populate({path:"userId",select:["firstName"]}) //this userId firstname show   who was comment on that post       


                return res.status(200).send(comments);
        } 
    catch (error)
    {
              return res.status(500).send({message:error.message});
            
    }

})


//post comment

commentrouter.post("/",async(req,res)=>{
    try {
        const comment=await Comment.create()

        return res.status(201).send(comment);
    } catch (error) {
        return res.status(500).send({message:error.message});
        
    }
})

//get comment  by id

commentrouter.get("/:id",async(req,res)=>{
    try {
        const comment=await Comment.findById().lean().exec();

        return res.status(201).send(comment);
    } catch (error) {
        return res.status(500).send({message:error.message});
        
    }
})


//update  comment by id

commentrouter.patch("/:id",async(req,res)=>{
    try {
        const comment=await Comment.findByIdAndUpdate(req.params.id, req.body,{new:true}).
        populate    ({path:"postId",select:["title"],
                    populate:{path:"userId", select:["firstname"]}
        }).
        populate({path:"userId", select:["email"]})
        
        .lean().exec();

        return res.status(200).send(comment);
    } catch (error) {
        return res.status(500).send({message:error.message});
        
    }
})


//delete comment by id

commentrouter.delete("/",async(req,res)=>{
    try {
        const comment=await Comment.findByIdAndDelete(req.params.id);
        return res.status(200).send(comment);
    } catch (error) {
        return res.status(500).send({message:error.message});
        
    }
})
  
module.exports=commentrouter