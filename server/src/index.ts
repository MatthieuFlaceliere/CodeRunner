import express, { Express } from 'express';
import dotenv from 'dotenv';
import ApiRouter from './routes/api.routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerConfig } from './config/swagger-config';
import swaggerJSDoc from 'swagger-jsdoc';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api', ApiRouter);

// Swagger route
const option = swaggerConfig.option;
const cssSwagger = swaggerConfig.customCss;
const swaggerSpec = swaggerJSDoc(option);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, cssSwagger));

// Start server
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
