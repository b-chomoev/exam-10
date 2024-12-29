import express from "express";
import {imagesUpload} from "../multer";
import Post from "../models/Post";
import mongoose from "mongoose";

const postsRouter = express.Router();

postsRouter.get('/', async (req: express.Request, res: express.Response, next) => {
    try {
        const posts = await Post.find({}, {description: 0});
        res.send(posts);
    } catch (e) {
        next(e);
    }
});

postsRouter.get('/:id', async (req: express.Request, res: express.Response, next) => {
    const id = req.params.id;

    if (!id) res.status(400).send('Params id of post must be in request');

    try {
        const posts = await Post.findById(id);

        if (!posts) res.status(404).send('Post not found');

        res.send(posts);
    } catch (e) {
        next(e);
    }
});

postsRouter.post('/', imagesUpload.single('image'), async (req: express.Request, res: express.Response, next) => {
    const {title, description} = req.body;

    const newPost = {
        title: title,
        description: description,
        image: req.file ? `images/${req.file.filename}` : null,
    }

    try {
        const newPostData = new Post(newPost);
        await newPostData.save();
        res.send(newPostData);
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

postsRouter.delete('/:id', async (req: express.Request, res: express.Response, next) => {
    const id = req.params.id;

    try {
        const deletePost = await Post.findByIdAndDelete(id);

        if (!deletePost) res.status(404).send('Post not found');

        res.send('Post deleted');
    } catch (e) {
        next(e);
    }
});

export default postsRouter;