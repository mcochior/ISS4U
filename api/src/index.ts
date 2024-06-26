import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';

import router from './router'


const app = express();
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger-output.json'; // Adjust the path



// app.use(cors({
//     // origin: 'http://localhost:8080'
//     // methods: ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE'],
//     // allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
// }));

// app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true'); 
    next();
});


app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const server = http.createServer(app);
const port = 0;
if (process.env.NODE_ENV == 'test') {
    server.listen(port, () => {
        console.log(`Listening on port ${port}`)
    });
}
else{
    const hey = server.listen(1001, () => {
        console.log('Server running on http://localhost:1001/');
    });
}


const MONGO_URL = 'mongodb+srv://Easeful5154:86MUCxra45GK*NKa$zqX@cluster0.nwhkgei.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());


export default app
