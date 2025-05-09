var createError = require('http-errors');
var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tipoRauter= require("./routes/rTipo.js");
var productoraRouter= require("./routes/rProductora.js");
var directorRouter= require("./routes/rDirector.js");
var generoRouter= require("./routes/rGenero.js");
var mediaRouter= require("./routes/rMedia.js");


var app = express();

//const port=3001;
const port=10000;
//const port = process.env.PORT || 3001;

const corsOptions = {
    origin: "*", // Allow only requests from this origin
	credentials:false,
    methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"], // Allow only these methods
    allowedHeaders: ['Content-Type'] // Allow only these headers
};
app.use(cors(corsOptions));

app.listen(port,()=>{
	console.log("correindo en http:localhost:"+port);
	
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//agregados
app.use("/tipo", tipoRauter);
app.use("/productora", productoraRouter);
app.use("/director",directorRouter);
app.use("/genero",generoRouter);
app.use("/media",mediaRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
