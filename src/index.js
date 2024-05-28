const express = require('express');
const connect = require('./config/database');
const app = express();

const TweetRepository = require('./repository/tweet-repository');
const Comment = require('./models/comment')

app.listen(3000,async()=>{
    console.log('Server started');
    await connect();
    console.log('MongoDB connected')
    const tweetRepo = new TweetRepository();
    const tweet = await tweetRepo.getWithComments('665609a8a9d7524323cb6b39')
    console.log(tweet)
})