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
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            message: "Interal Server Down.", error
        });
    }
}

export const updatePost = async (req, res) => {
    try {

        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "Cannot be empty!"
            })
        }

        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!post) return res.status(404).json({
            message: "Post not Found."
        });

        res.status(200).json({
            message: "Post Updated!", post
        })
    } catch (error) {
        res.status(500).json({
            message: "Interal Server Down.", error
        });
    }
}

export const deletePost = async (res, req) => {
    try {
        const deleted = await Post.findByIdAndDelete(req.params.id)

        if (!deleted) return res.status(404).json({
            message: "Post was not found!"
        })

        res.status(200).json({
            message: "Post have been deleted!", deleted
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server is down!", error
        })
    }
}