import express from "express";
import Post from "../models/Post";
import mongoose from "mongoose";
import Comment from "../models/Comment";

const commentsRouter = express.Router();

commentsRouter.get('/', async (req: express.Request, res: express.Response, next) => {
    const postIdQuery = req.query.news_id;

    try {
        const filter = postIdQuery ? {post: postIdQuery} : {};
        const comments = await Comment.find(filter);
        res.send(comments);
    } catch (e) {
        next(e);
    }
});

commentsRouter.post('/', async (req: express.Request, res: express.Response, next) => {
    const {post, author, text} = req.body;

    if (!post) res.sendStatus(400).send('Post id must be in request');

    try {
        const existingPost = await Post.findById(post);
        if (!existingPost) res.sendStatus(404).send('Post not found');

        const newComment = new Comment({
            post,
            author: author || 'Anonymous',
            text
        });

        await newComment.save();
        res.send(newComment);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            const ValidationErrors = Object.keys(e.errors).map(key => ({
                field: key,
                message: e.errors[key].message,
            }));

            res.status(400).send({errors: ValidationErrors});
        }

        next(e);
    }
});

commentsRouter.delete('/:id', async (req: express.Request, res: express.Response, next) => {
    const {id} = req.params;

    if (!id) res.sendStatus(400).send('Comment id must be in request');

    try {
        const deletedComment = await Comment.findByIdAndDelete(id);

        if (!deletedComment) res.sendStatus(404).send('Comment not found');

        res.send('Comment was deleted successfully');
    } catch (e) {
        next(e);
    }
});

export default commentsRouter;