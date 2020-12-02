var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));//使用日志插件
app.use(express.json()); //提取出post body中的内容json格式
app.use(express.urlencoded({ extended: false }));//解析post  urlencoded格式
app.use(cookieParser());//解析cookie
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);//注册路由
// app.use('/users', usersRouter);
app.use('/api/blog',blogRouter);
app.use('/api/blog',userRouter); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));//检验错误页，如果是404稍微友好的提示
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
