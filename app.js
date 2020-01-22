var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require("mongoose");

var credential=require("./credential")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var validateRouter = require('./routes/validator_server');
var addProdRouter = require('./routes/reg_item');
var tempRouter = require('./routes/temp');
var listingRouter = require('./routes/listing');
var cartRouter = require('./routes/cart');
var searchRouter = require('./routes/search');

var app = express();

mongoose.connect(credential.mongo.production.connectionString,
  {useNewUrlParser:true}).catch(err=>console.log(err))
mongoose.connection.on("error",err=>{
    //console.log(err)
    //use local db
    mongoose.connect(credential.mongo.development.connectionString,{useNewUrlParser:true}).
    catch(err=>console.log(err))
})
mongoose.connection.on("connected",()=>{
    console.log("Connected to db...")
})

var session = require("express-session")
var bodyParser = require("body-parser");
var MongoDBStore = require("connect-mongodb-session")(session)

var store = new MongoDBStore({
  uri: credential.mongo.development.connectionString,
  //databaseName: "heroku_b2g7qwz1",
  collection: "mySessions"
}, (err) => { console.log(err) })
store.on("error", (err) => {
  console.log(err)
})
app.use(session({ secret: "gistal", store: store, saveUninitialized: true, resave: true }))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit:"100mb"}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var authRouter=require("./routes/auth")(app)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', (req,res,next)=>{
  console.log(`session: ${req.user}`)
  return next("route")
});
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/validate', validateRouter);
app.use('/add_item', addProdRouter);
app.use('/temp', tempRouter);
app.use('/listing', listingRouter);
app.use('/cart', cartRouter);
app.use('/search', searchRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
