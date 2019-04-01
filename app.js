var watch = require('./src/watch/fs-watch')

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

/**
 *
 *【链接】Download.NETFramework
 https://dotnet.microsoft.com/download/dotnet-framework**/


/**
 * PATH="$PATH":/usr/local/mysql/bin
 *
 * mysql -u root -p 登陆。 这个可以跟很多参数，包括端口，ip,  --prompt \h \d \D \u  提示符
 *
 * exit; 退出. 所有命令以分号结束
 *
 * CREATE {DATABASE | SCHEMA} [IF NOT EXISTS] db_name [DEFAULT] CHARACTER SET [=] charset_name;  创建数据库
 *
 * SHOW DATABASES; 查看数据库列表, 还可以查看 TABLES  COLUMNS
 *
 * DROP {DATABASE | SCHEMA} [IF EXISTS] db_name; 删除数据库
 *
 * USE database_name; 使用数据库
 *
 * SELECT DATABASE(); 查看当前数据库
 *
 * 创建数据表 CREATE TABLE table_name (
 *  column_name data_type [NULL | NOT NULL] [AUTO_INCREMENT]
 * )
 *
 * 主键: PRIMARY KEY  一张数据表只能有一个
 * 自动编号：AUTO_INCREMENT  必须搭配主键一起使用
 * 唯一约束：UNIQUE KEY  一张表可以多个，允许为空
 * 默认值： DEFAULT 'XXX'
 *
 * 查看数据表 SELECT TABLES [FROM db_name] [LINK 'pattern' | WHERE expr]
 *
 * 插入记录 INSERT [INTO] tb_name [(col_name,...)] VALUES(val,....)
 *
 * 记录查找 SELECT expr,... FROM tb_name
 *
 * 添加列 ALTER TABLE tab_name ADD [COLUMN] col_name column_definition [FIRST | AFTER col_name]
 * 删除列 ALTER TABLE tab_name DROP [COLUMN] col_name
 * 修改列定义(顺序等) ALTER TABLE tab_name MODIFY  col_name XXX
 * 修改列定义(列名等) ALTER TABLE tab_name CHANGE  col_name new_col_name
 * 修改列数据  UPDATE tab_name SET  col_name = new_col_value [WHERE] XX
 * 删除列数据  DELETE FROM tab_name [WHERE] XX
 *
 * 条件查询
 * SELECT * FROM tb_name WHERE XX  // * 代表查询出来的结构，当为*表示所有字段，为具体的列名就只有当列
 *
 *
 * stock => record
 *
 *
 * create table record(
 *  tab
 * )
 * **/