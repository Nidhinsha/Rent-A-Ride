var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const mongoose = require("mongoose")
let PORT = 5000 || process.env.PORT
const dotenv = require('dotenv')
dotenv.config()


const usersRouter = require('./routes/User/users');
const adminRouter = require('./routes/Admin/admin')

var app = express();

// cors 
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200
}

app.use(cors(corsOptions))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Mongoose Connect
mongoose.connect('mongodb://localhost:27017/RentAndRide')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// the routes 
app.use('/', usersRouter)
app.use('/admin',adminRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(PORT, (req, res) => {
  console.log(`server is runnig http://localhost:${PORT}/`);
})
module.exports = app;
