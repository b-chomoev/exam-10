import express from "express";
import {imagesUpload} from "../multer";
import {INewsWithoutIdAndDate} from "../types";
import fileDbNews from "../fileDbNews";

const commentsRouter = express.Router();

commentsRouter.post('/', imagesUpload.single('image'), async (req,res) => {
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

commentsRouter.get('/', async (_req, res) => {
    const news = await fileDbNews.getNews();
    res.send(news);
});

commentsRouter.get('/:id', async (req, res) => {
    const news = await fileDbNews.getNewsById();
    const newsFindById = news.find((news) => news.id === req.params.id);
    res.send(newsFindById);
});

commentsRouter.delete('/:id', async (req, res) => {
    const news = await fileDbNews.getNewsById();
    const newsIndex = news.findIndex((news) => news.id === req.params.id);
    if (newsIndex === -1) {
        res.status(404).send({error: 'News not found'});
        return;
    } else {
        news.splice(newsIndex, 1);
        await fileDbNews.save();
        res.send('News deleted');
    }
});

export default commentsRouter;