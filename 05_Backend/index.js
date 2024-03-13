// External dependencies
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config(); 
const cors=require('cors');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Database connection
const { connectToDatabase } = require("./database/db");
// Importing Internal Routers
const authRouter = require("./router/authRouter");
const userRouter = require("./router/userRouter");
const orderRouter = require("./router/orderRouter");
const productRouter = require("./router/productRouter");
const sellerRouter = require("./router/sellerRouter");
const checkoutRouter = require("./router/checkoutRouter");

// Setting up the app
const app = express();
app.use(bodyParser.json());

app.use(cors());

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// Routes
// Authentication Router
app.use("/auth", authRouter);

// User Router
app.use("/user", userRouter);

// Order Router
app.use("/order", orderRouter);

// Product Router
app.use("/product", productRouter);

// Seller Router
app.use("/seller", sellerRouter);

// Checkout Router
app.use("/checkout", checkoutRouter);

async function startServerAndDatabase() {
  await connectToDatabase();
  app.listen(process.env.PORT || 3000, () =>
    console.log(`Server live at ${process.env.PORT || 3000}`)
  );
}

startServerAndDatabase();



const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API for your project',
      version: '1.0.0',
      description: 'Description of your API',
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
      contact: {
        name: 'Your Name',
        url: 'https://yourwebsite.com',
        email: 'your@email.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: 'Enter your bearer token in the format "Bearer {token}"'
        }
      }
    },
    security: [{ BearerAuth: [] }]
  },
  // Specify the path to your API routes
  apis: ['./router/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

console.log("swaggerUI setup complete");
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));