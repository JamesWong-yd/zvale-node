const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://zvale:zvale20180122.@120.79.203.126:9088/zvale')

const app = express();

// allow orogin
app.all('*', function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");  
  next();
}); 

app.use(helmet())
// route
const users = require('./routes/users');
const cars = require('./routes/cars')
const account = require('./routes/account')

// middleWares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use('/users', users)
app.use('/cars', cars)
app.use('/accounts', account)

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
