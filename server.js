const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const headers = require('./headers');
const { successHandle, errorHandle  } = require('./handles');
const checkBody = require('./tools/checkBody');
const Post = require('./model/post');

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB).then(() => {
  console.log('連線資料庫成功');
})

const requestListener = async (req, res) => {
  let body = '';
  req.on('data', (chunk) => body += chunk);

  if (req.url === '/posts' && req.method === 'GET') {
    try {
      // 預設回傳貼文時間：新到舊
      const posts = await Post.find().sort({createdAt: -1});
      successHandle(res, posts);
    } catch {
      errorHandle(res, '取得資料失敗')
    }
  } else if (req.url === '/posts' && req.method === 'POST') {
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const isPass = checkBody(res, data);
        console.log();
        if (isPass) {
          const newPost = await Post.create({
            name: data.name,
            tags: data.tags,
            type: data.type,
            image: data.image,
            content: data.content,
          })
          successHandle(res, newPost);
        }
      } catch(error) {
        errorHandle(res, error.errors)
      }
    })
  } else if (req.url === '/posts' && req.method === 'DELETE') {
    await Post.deleteMany({});
    successHandle(res, '刪除所有資料成功');
  } else if (req.url.startsWith('/posts/') && req.method === 'DELETE') {
    const postId = req.url.split('/').pop();
    const result = await Post.findByIdAndDelete(postId);
    if (result) {
      successHandle(res, '刪除資料成功');
    } else {
      errorHandle(res, '刪除資料失敗，無此 ID');
    }
  } else if (req.url.startsWith('/posts/') && req.method === 'PATCH') {
    req.on('end', async () => {
      try {
        const postId = req.url.split('/').pop();
        const data = JSON.parse(body);
        const isPass = checkBody(res, data);
        if (isPass) {
          await Post.findByIdAndUpdate(postId, {
            name: data.name,
            tags: data.tags,
            type: data.type,
            image: data.image,
            content: data.content,
          });
          successHandle(res, '修改資料成功')
        }
      } catch(error) {
        errorHandle(res, error.errors);
      }
    })
  } else if (req.url === '/posts' && req.method === 'OPTIONS') {
    successHandle(res, 'OPTIONS');
  } else {
    res.writeHead(404, headers);
    res.write(JSON.stringify({
      status: 'false',
      data: '無此頁面'
    }));
    res.end();
  }
}


http.createServer(requestListener).listen(process.env.PORT);