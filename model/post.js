const {Schema, model} = require('mongoose');
const postScheam = new Schema(
  {
    name: {
      type: String,
      required: [true, '貼文欄位 {PATH} 未填寫'],
    },
    tags: [
      {
        type: String,
        required: [true, '貼文欄位 {PATH} 未填寫']
      }
    ],
    type: {
      type: String,
      required: [true, '貼文欄位 {PATH} 未填寫']
    },
    image: {
      type: String,
      default: '',
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false
    },
    content: {
      type: String,
      required: [true, '貼文欄位 {PATH} 未填寫'],
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false
  }
)
const Post = model('Post', postScheam);
module.exports = Post;