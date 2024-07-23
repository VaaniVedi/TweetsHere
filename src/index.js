import express from 'express';
import {connect} from './config/database.js'
const app = express();

import service from './service/tweet-service.js';

app.listen(3000,async()=>{
    console.log('Server started');
    await connect();
    console.log('MongoDB connected');
    let ser = new service();
    await ser.create({
        content: 'my other #CoDE #works or #NOT'
    })
});