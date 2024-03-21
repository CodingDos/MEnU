import Comment from "../models/comment.js"
import jwt from "jsonwebtoken";

export const getComments = async (req, res) => {
    try {
        const { recipeId } = req.params
        const comments = await Comment.find({recipeId: recipeId})
        res.json(comments)
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

export const createComment = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if(!token) {
            return res
            .status(401)
            .json({ error: "Authorization token not provided" });
        }
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const userId = decoded.id;

        const { recipeId } = req.params
        console.log(recipeId, 'szdjfhdjkfhdohgkjfjligkfjthdtjkilugkyfjhtdtfjkulhilgkfjdhfj;ouhigufjhx')
        const newComment = new Comment({ ...req.body, recipeId: recipeId, userId: userId })
        await newComment.save()
        res.status(201).json(newComment)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }

}

export const editComment = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if(!token) {
            return res
            .status(401)
            .json({ error: "Authorization token not provided" });
        }
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const userId = decoded.id;

        const { id } = req.params
        const comment = await Comment.findById(id) //try with userId

        
        //  THIS IS FRONT END LOGIC !potentially need to compare userid with comment id | need to make sure only comments made by the user can be edited.
        // if (comment.userId === userId) {

            const userComment = await Comment.findByIdAndUpdate(id, req.body, { new: true, })
            console.log(userComment)
            res.status(201).json(userComment)
        // }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

export const deleteComment = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if(!token) {
            return res
            .status(401)
            .json({ error: "Authorization token not provided" });
        }
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const userId = decoded.id;
        
        const { id } = req.params
        const comment = await Comment.findById(id)

        // if (comment.userId === userId){
            const deleted = await Comment.findByIdAndDelete(id)
            if (deleted) {
                return res.status(200).send("Comment deleted");
              }
              throw new Error("Comment not found");
        // }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });   
    }
}