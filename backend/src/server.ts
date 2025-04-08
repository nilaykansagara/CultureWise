import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { questionRoutes } from './routes/questionRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/questions', questionRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 