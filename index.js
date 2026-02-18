import cors from 'cors';
import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import router from './router.js'
const app = express();
dotenv.config();
const urlsAllowed = ['http://localhost:4200'];
const allowUrls = {
  origin: (origin, callback) => {
    if (!origin && urlsAllowed.includes(origin)) {
      callback(null, true);
    } else {
      callback((error) => 'cors blocked the url');
    }
  },
};
// app.use(cors(allowUrls));
app.use(cors());
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URI)
  .then(console.log('mongo db connected'))
  .catch((err) => {
    console.log(err);
  });
app.use('/', router);
app.listen(4000, () => {
  console.log('server connected');
});
