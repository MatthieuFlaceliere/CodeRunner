import express, { Express } from 'express';
import dotenv from 'dotenv';
import ApiRouter from './routes/api.routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerConfig } from './config/swagger-config';
import swaggerJSDoc from 'swagger-jsdoc';
import { corsConfig } from './middleware/cors';
import { createClient } from 'redis';
import Docker from 'dockerode';
import mongoose from 'mongoose';
import { hydrateDBService } from './services/hydrateDB.service';

dotenv.config();

export const RedisClient = createClient({
  url: 'redis://' + process.env.REDIS_HOST + ':' + process.env.REDIS_PORT,
});
export const DockerClient = new Docker();

const main = async () => {
  const app: Express = express();
  const port = process.env.PORT || 3000;

  app.use(corsConfig);

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

  // Try to connect to Docker
  console.log('⚙️[Docker] Try to connect to Docker');
  DockerClient.ping((err) => {
    if (err) {
      console.log('❌ [Docker] Docker is not running');
      console.log(err);
      return;
    }
    console.log('⚡️[Docker] Docker is running');
    console.log('⚙️[Redis] Try to connect to Redis');

    RedisClient.on('error', (err) => console.log('❌ [Redis] error: \n', err));

    RedisClient.connect();

    RedisClient.on('connect', () => {
      console.log('⚡️[Redis] Redis is running');
      console.log('⚙️[MongoDB] Try to connect to MongoDB');

      mongoose
        .connect(
          'mongodb://' + process.env.MONGODB_HOST + ':' + process.env.MONGODB_PORT + '/' + process.env.MONGODB_DB,
        )
        .then(() => {
          console.log('⚡️[MongoDB] MongoDB is running');

          // Start server
          app.listen(port, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${port}`);

            // Hydrate database
            hydrateDBService();
          });
        })
        .catch((err) => {
          console.log('❌ [MongoDB] MongoDB is not running');
          console.log(err);
        });
    });
  });
};

main();
