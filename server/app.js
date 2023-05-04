var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require("body-parser")
var logger = require('morgan');
const cors = require('cors')
const mongoose = require("mongoose")
const socket = require("socket.io")
let PORT = 5000 || process.env.PORT
const dotenv = require('dotenv')
dotenv.config()


const usersRouter = require('./routes/User/users');
const adminRouter = require('./routes/Admin/admin')

var app = express();


app.use(express.json())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// MongoDb connnection
const uri = process.env.MONGO_DB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(error => console.log("Error connecting to MongoDB", error));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// cors calling
app.use(cors())
// the routes 
app.use('/api/user', usersRouter)
app.use('/api/admin',adminRouter)

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
  res.status(err.status || 500)
  res.send(err);
});


const server = app.listen(PORT, (req, res) => {
  console.log(`server is runnig http://localhost:${PORT}/`);
})

const io = socket(server,{
  cors: {
    origin: "https://rentarideshop.netlify.app",
    credentials: true,
  },
})

global.onlineUsers = new Map()

io.on("connection",(socket)=>{
  global.chatSocket = socket
  socket.on("add-user",(userId)=>{
    onlineUsers.set(userId,socket.id)
   
  })
 

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);

    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.message);
    }
  });
})
module.exports = app;
