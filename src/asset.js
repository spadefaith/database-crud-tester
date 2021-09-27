const express = require('express');
const router = express.Router();

router.get('/cake.js', function(req, res, next){
 
    res.sendFile(`${__dirname}/local_modules/bundled.js`);
 
});

module.exports = router;