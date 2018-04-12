const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const config = require('./baseconfig/config');
const validateAuth = require('./auth/validateLogin')

mongoose.Promise = global.Promise;
mongoose.connect(config.dbconfig)

const app = express();

// allow orogin
app.all('*', function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "http://localhost:8093");  
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type");  
  res.header("Access-Control-Allow-Methods","GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.header("Content-Type", "application/json;charset=utf-8");
  if(req.method==="OPTIONS") return res.status(200).json();
  next();
}); 

app.use(helmet())
// route
const routerIndex = require('./routes/index')
const login = require('./auth/login')

// middleWares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use('/bm/login',login)
app.use('/bm/*',validateAuth.authorVali)
app.use('/bm/users', routerIndex.users)
app.use('/bm/cars', routerIndex.cars)
app.use('/bm/accounts', routerIndex.account)
app.use('/bm/messages', routerIndex.message)

// catch 404 and other errors
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
})

// error handler function
app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;

  // respond to client
  res.status(status).json({
    status: false,
    msg: error.message
  });

  // respond to ourselves
  console.error(err);
})

// start the server
const port = app.get('port') || 3000;
app.listen(port, () => console.log(`server is listening on port ${port}`));
