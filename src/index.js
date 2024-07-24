import express from 'express';
import bodyParser from 'body-parser'
import {connect} from './config/database.js'

import apiRoutes from './routes/index.js'
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//import service from './service/tweet-service.js';

app.use('/api',apiRoutes);



app.listen(3000,async()=>{
    console.log('Server started');
    await connect();
    console.log('MongoDB connected')
});