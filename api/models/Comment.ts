import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    author: {
        type: String,
        default: 'Anonymous'
    },
    text: {
        type: String,
        required: [true, 'Text is required']
    }
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;