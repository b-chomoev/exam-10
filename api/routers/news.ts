import express from "express";
import {imagesUpload} from "../multer";
import {INewsWithoutIdAndDate} from "../types";
import fileDbNews from "../fileDbNews";

const newsRouter = express.Router();

newsRouter.post('/', imagesUpload.single('image'), async (req,res) => {
    if (!req.body.title || !req.body.content) {
        res.status(400).send({error: 'Title and text must be present in the request'});
        return;
    }

    const news: INewsWithoutIdAndDate = {
        title: req.body.title,
        content: req.body.content,
        image: req.file ? 'images' + req.file.filename : null,
    }

    const savedNews = await fileDbNews.addNews(news);

    res.send(savedNews);
});

export default newsRouter;