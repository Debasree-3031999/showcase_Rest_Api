const express = require("express")



//--schema importing---//
const User = require("../MODELS/user.model")

const Post = require("../MODELS/post.model")

const Comment = require("../MODELS/comment.model")


const userrouter = express.Router();

//USERS CRUD
//what we want==code

//body=>req.body
//url=>req.url
//query string=>req.query

userrouter.get("/", async (req, res) => {

    try {
        const user = await User.find().lean().exec()
        return res.status(200).send({ userget: user }) //if nothing can get it returns  empty arr []

    } catch (error) {

        return res.status(500).send({ message: "something went wrong" })

    }
})


//POST DATA

userrouter.post("/", async (req, res) => {
    try {
        const user = await User.create(req.body);

        return res.status(201).send({ user: user })
    } catch (error) {

        return res.status(500).send({ message: "something went wrong" })

    }
})

//FIND BY ID

userrouter.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).lean().exec();

        res.status(200).send({ findbyid: user });
    } catch (error) {

        return res.status(500).send({ message: error.message })

    }
})

//UPDATED DATA
userrouter.patch("/:id", async (req, res) => {


    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean().exec()

        res.status(201).send({ updated: user })

    } catch (error) {
        req.status(500).send({ message: error.message })

    }
})

//DELETE DATA

userrouter.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id).lean().exec()

        return res.status(200).send({ deletebyid: user })
    } catch (error) {
        return res.status(500).send({ message: error.message })

    }
})

//how to get all  post of a user//
userrouter.get("/:userId/post", async (req, res) => {
    console.log(req.params.userId)
    try {
        const posts = await Post.find({ userId: req.params.userId }).lean().exec();

        return res.status(200).send(posts);
    } catch (error) {
        return res.status(500).send({ message: error.message });

    }
})


module.exports = userrouter




