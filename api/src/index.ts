import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';

import router from './router'

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(1001, () => {
    console.log('Server running on http://localhost:1001/');
});

const MONGO_URL = 'mongodb+srv://Easeful5154:86MUCxra45GK*NKa$zqX@cluster0.nwhkgei.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());