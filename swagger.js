const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      title: 'Fast Food Order API',
      description: 'This API allows you to retrieve orders placed by customers, as well as create new ones and update or delete existing ones'
    },
    host: 'somewhere.onrender.com',
    schemes: ['https'],
  };
  
  const outputFile = './swagger.json';
  const routes = ['routes/index.js'];
  
  swaggerAutogen(outputFile, routes, doc);