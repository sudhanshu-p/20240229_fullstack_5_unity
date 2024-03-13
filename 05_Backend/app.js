const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express(); // Create express app

app.use('/docs', express.static('public/docs'));

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Ecommerce',
    version: '1.0.0',
    description: 'This is a REST API application made with Express.',
    license: {
      name: 'Ecommerce License',
      url: 'https://your-ecommerce-license-url.com',
    },
    contact: {
      name: 'Your Ecommerce Company',
      url: 'https://your-ecommerce-website.com',
      email: 'info@your-ecommerce-website.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./router/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);



console.log('Swagger UI setup complete');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
