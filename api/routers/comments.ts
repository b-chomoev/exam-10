import express from "express";
import {ICommentWithoutId} from "../types";
import fileDbComments from "../fileDbComments";
import fileDbNews from "../fileDbNews";

const commentsRouter = express.Router();

commentsRouter.post('/', async (req, res) => {
    if (!req.body.newsId || !req.body.content) {
        res.status(400).send({error: 'NewsId and content must be present in the request'});
        return;
    }

    const news = await fileDbNews.getNewsById();
    const newsId = news.some(item => item.id === req.body.newsId);

    if (!newsId) {
        res.status(404).send({error: 'News not found'});
        return;
    }

    const comment: ICommentWithoutId = {
        newsId: req.body.newsId,
        author: req.body.author || 'Anonymous',
        content: req.body.content,
    }

    const savedComment = await fileDbComments.addComment(comment);
    res.send(savedComment);
});

commentsRouter.get('/', async (req, res) => {
    const newsId = req.query.news_id as string;

    if (!newsId) {
        const comments = await fileDbComments.getComments();
        res.send(comments);
        return;
    }

    const comments = await fileDbComments.getComments();
    const filteredComments = comments.filter((comment) => comment.newsId === newsId);

    res.send(filteredComments);
});

export default commentsRouter;