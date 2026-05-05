import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(express.json());
app.use(morgan('dev')); //logger user for request and respond detail all detail have multiple type like dev 

app.use('/api/auth', authRouter);

export default app;

