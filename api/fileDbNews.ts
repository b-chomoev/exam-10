import {INews, INewsWithoutIdAndDate} from "./types";
import {promises as fs} from 'fs';

const fileName = './dbNews.json';
let dataNews: INews[] = [];

const fileDbNews = {
    async init() {
        try {
            const fileContent = await fs.readFile(fileName);
            dataNews = JSON.parse(fileContent.toString()) as INews[];
        } catch (err) {
            console.log(err);
        }
    },
    async getNews() {
        return dataNews.map(({id, title, date, image}) => ({id, title, date, image}));
    },
    async getNewsById() {
        return dataNews;
    },
    async addNews(news: INewsWithoutIdAndDate) {
        const id = crypto.randomUUID();
        const date = new Date().toISOString();
        const result = {id, ...news, date};
        dataNews.push(result);
        await this.save();
        return result;
    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(dataNews));
    }
}

export default fileDbNews;