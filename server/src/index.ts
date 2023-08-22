import express, { Express } from 'express';
import dotenv from 'dotenv';
import ApiRouter from './routes/api.routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api', ApiRouter);

// Start server
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
