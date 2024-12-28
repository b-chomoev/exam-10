import mongoose, {CallbackError} from "mongoose";

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

PostSchema.pre('findOneAndDelete', async function (next) {
    const postId = this.getQuery().id;

    try {
        await mongoose.model('Comment').deleteMany({post: postId});
    } catch (error) {
        next(error as CallbackError);
    }
});

const Post = mongoose.model('Post', PostSchema);

export default Post;