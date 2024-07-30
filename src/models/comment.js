import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    onModel: {
        type: String,
        enum: ['Tweet','Comment'],
        required:true
    },
    commentable: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'onModel',
        required: true
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},{timestamps:true});

const Comment = mongoose.model('Comment',commentSchema);
export default Comment;