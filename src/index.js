const express = require('express');
const cors = require('cors');
const socket = require('socket.io');
 

const app = express();

const tokenRouter = require('./middleware/middleware-token/token'); 
const swaggerRouter = require('./middleware/middleware-swagger/swagger'); 
const assetRouter = require('./asset');

const port = 6789;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(function(req,res,next){
    req.locals = {};
    next();
})
 
app.use('/', express.static(`${__dirname}/public/login`));
 
app.use('/docs', swaggerRouter);
app.use('/asset', assetRouter);
 

app.use('/login', function(req,res,next){
    //include the loginCredential;
    req.body.time = new Date();
    req.locals.loginCredential = req.body;
 
    if (req.locals.loginCredential.password == 'cedrickcampoto'){

        next();
    } else {

        res.sendStatus(401);
    }


}, tokenRouter.create, function(req,res,next){
    res.redirect('/main');
});

app.use('/main', express.static(`${__dirname}/public/main`));


const server = app.listen(port, function(err){
    (err) ? console.log(err):console.log(`listen to port ${port}`);
});

const io = new socket.Server(server);

io.on('connection', function(socket){
    socket.emit('connected', socket.id);
});