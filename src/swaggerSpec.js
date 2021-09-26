/**
 * Swagger Spec
 * @module swaggerSpec
 */

const swaggerJSDoc = require('swagger-jsdoc');



/**
 * @typedef {Object} info - api information;
 * @property {string} title - title of the api;
 * @property {string} version - version of the api;
 * 
 */

/**
 * @type {info} 
 * 
 */

 const info = {
    title: 'Todo API',
    version: '1.0.0',
    description: 'Todo API',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'Cedrick F. Campoto',
      url: 'https://profile.cedrickcampoto.repl.co',
    },
  }


/**
 * Swagger Definition 
 * @property {string} openapi - openapi version
 * @property { {title:string, version:string} } info - api informations
 */
const swaggerDefinition = {
  openapi: '3.0.0', 
  info ,
  servers: [
    {
      url: 'http://localhost:6789',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
 
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;