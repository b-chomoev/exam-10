import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    description: {
        type: String,
        required: [true, 'description is required'],
    },
    image: {
        type: String,
        default: null
    },
    date: {
        type: String,
        default: () => new Date().toISOString()
    }
});

const Post = mongoose.model('Post', PostSchema);

export default Post;