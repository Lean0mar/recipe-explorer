import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db';
import router from './routes';
import { errorHandler } from './middlewares/errorHandler';
import { setupSwagger } from './docs/swagger';

connectDB();

const app = express();

app.use(morgan('dev'));

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

setupSwagger(app);

app.use('/api', router);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));