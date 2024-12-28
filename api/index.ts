import express from 'express';
import cors from "cors";
import mongoose from "mongoose";
import PostsRouter from "./routers/comments";
import commentsRouter from "./routers/posts";
import mongoDb from "./mongoDb";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use(express.static('public'));
app.use('/posts', PostsRouter);
app.use('/comments', commentsRouter);

const run = async () => {
    await mongoose.connect('mongodb://localhost/news')

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });

    process.on('exit', () => {
        mongoDb.disconnect();
    });
};

run().catch(err => console.log(err));