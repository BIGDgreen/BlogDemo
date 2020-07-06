const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const logger = require('morgan'); // 生成日志
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const { SECRET_KEY, COOKIE_AGE } = require('./utils/constant')

// const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');

const app = express();

// // view engine setup 前端页面设置
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

const env = process.env.NODE_ENV;
if (env === 'dev') {
  app.use(logger('dev'));
} else if (env === 'production') {
  const logFileName = path.join(__dirname, 'logs', 'access.log');
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'  // append
  });
  app.use(logger('combined', {
    stream: writeStream
  }));

}

// 获取post数据后，放入req.body
app.use(express.json());  // 获取post数据 content-type为json时
app.use(express.urlencoded({ extended: false })); // 兼容content-type:x-www-form-urlencoded

app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public'))); // 前端静态数据

const redisClient = require('./redis/index');
const sessionStore = new RedisStore({
  client: redisClient
});

app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: SECRET_KEY,
  cookie: {
    // path: '/', // default
    // httpOnly: true,  // default
    maxAge: COOKIE_AGE
  },
  store: sessionStore // session存到redis
}));

// 注册路由
// app.use('/', indexRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next();
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
