const {Schema, model} = require('mongoose');
const postScheam = new Schema(
  {
    name: {
      type: String,
      required: [true, '貼文姓名未填寫'],
    },
    tags: [
      {
        type: String,
        required: [true, '貼文標籤 tags 未填寫']
      }
    ],
    type: {
      type: String,
      required: [true, '貼文類型 type 未填寫']
    },
    image: {
      type: String,
      default: '',
    },
    cratedAt: {
      type: Date,
      default: Date.now,
      select: false
    },
    content: {
      type: String,
      required: [true, '內容未填寫'],
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