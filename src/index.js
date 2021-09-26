const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerSpec');
const app = express();
const router = express.Router();

const tokenRouter = require('./middleware/middleware-token/token'); 

const port = 6789;

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
router.use(cors());


/**
 * Middleware that parses token;
 */

router.use('/login', tokenRouter.create);



app.use(router);

const server = app.listen(port, function(err){
    (err) ? console.log(err):console.log(`listen to port ${port}`);
});

