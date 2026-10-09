import { Post } from "../model/post.model.js";

export const createPost = async (req, res) => {
    try {

        console.log("incoming req.body", req.body)
        const { name, description, age } = req.body

        if (!name || !description || !age) {
            return res.status(400).json({
                message: "Invalid Request, Please Fil Every Input."
            });
        }

        const post = await Post.create({ name, description, age });

        res.status(201).json({
            message: "Request Accepted.",
            post: post.toObject()
        })
    } catch (error) {
        res.status(500).json({
            message: "Interal Server Down.", error
        });
    }
}


export const getPosts = async (req, res) => {
    try {
        const getPosts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
    res.status(500).json({
        message: "Interal Server Down.", error
    });
    }
}