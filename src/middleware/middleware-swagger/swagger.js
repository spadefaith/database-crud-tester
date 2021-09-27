const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerSpec');


module.exports = [swaggerUi.serve, swaggerUi.setup(swaggerSpec)];