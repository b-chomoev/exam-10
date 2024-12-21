import {IComment, ICommentWithoutId} from "./types";
import {promises as fs} from 'fs';

const fileName = './dbComments.json';
let dataComments: IComment[] = [];

const fileDbComments = {
    async init() {
        try {
            const fileContent = await fs.readFile(fileName);
            dataComments = JSON.parse(fileContent.toString()) as IComment[];
        } catch (err) {
            console.log(err);
        }
    },
    async getComments() {
        return dataComments;
    },
    async addComment(comment: ICommentWithoutId) {
        const id = crypto.randomUUID();
        const result = {id, ...comment};
        dataComments.push(result);
        await this.save();
        return result;
    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(dataComments));
    }
};

export default fileDbComments;