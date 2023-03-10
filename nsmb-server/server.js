import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRouter.js';
import orderRouter from './routes/orderRoutes.js';
import accountRouter from './routes/accountRoutes.js';
import carddRouter from './routes/carddRoutes.js';
import checkRouter from './routes/checkRoutes.js';
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => { 
    console.log('connected to NSMB Database'); //**************MONGODB
  })
  .catch((err) => {
    console.log(err.message);
  });
  
const app = express(); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/accounts', accountRouter);
app.use('/api/cardds', carddRouter);
app.use('/api/checks', checkRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});