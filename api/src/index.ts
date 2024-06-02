import express from 'express';
import mongoose from 'mongoose';
import router from './router';

const app = express();

const MONGO_URL = 'mongodb+srv://Easeful5154:86MUCxra45GK*NKa$zqX@cluster0.nwhkgei.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB connection string

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL);

mongoose.connection.on('error', (error: Error) => {
  console.error('Database connection error:', error);
});

app.use(express.json());
app.use('/', router());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;