const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const PostSchema = new Schema({
    title:String,
    summary: String,
    content: String,
    cover:String,
    author:{type:Schema.Types.ObjectId, ref:'User'},
    createdAt: {
        type: Date,
        default: Date.now // This sets the default value to the current date and time
      },
    }, {
        timestampts:true,
});

const PostModel = model('Post', PostSchema);

module.exports = PostModel;6