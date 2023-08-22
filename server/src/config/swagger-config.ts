import * as dotenv from 'dotenv';
dotenv.config();

const option = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Code runner API',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.routes.ts'],
};

const customCss = {
  customCss: '.swagger-ui .topbar { display: none }',
};

export const swaggerConfig = {
  customCss: customCss,
  option: option,
};
