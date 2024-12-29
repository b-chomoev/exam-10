import express from 'express';
import cors from "cors";
import mongoose from "mongoose";
import commentsRouter from "./routers/comments";
import postsRouter from "./routers/posts";
import mongoDb from "./mongoDb";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/posts', postsRouter);
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