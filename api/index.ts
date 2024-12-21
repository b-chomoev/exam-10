import express from 'express';
import commentsRouter from "./routers/comments";
import newsRouter from "./routers/news";
import fileDbNews from "./fileDbNews";

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static('public'));
app.use('/comments', commentsRouter);
app.use('/news', newsRouter);

const run = async () => {
    await fileDbNews.init();

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });
};

run().catch(err => console.log(err));