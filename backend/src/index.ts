import express from 'express';
import cors from 'cors';
import dotEnv from 'dotenv';
import * as routers from "./routers/index.ts";  
dotEnv.config({quiet: true});
import { connectDb } from './db/mongoose';
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/user',routers.user);
app.use('/company',routers.company);
app.use('/nifty',routers.nifty);
const start = async () => {
  await connectDb();
  app.listen(port, () => {
    console.log(`Server is running at PORT ${port}`);
  });
};

start().catch((err) => {
  console.error('Failed to start server', err);
  process.exit(1);
});