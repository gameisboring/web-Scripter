var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const helmet = require('helmet')

var app = express()

app.io = require('./socket')(app)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// helmet middleware
app.use(helmet.contentSecurityPolicy())
app.use(helmet.hidePoweredBy())
app.use(helmet.xssFilter())
app.use(helmet.noSniff())
app.use(helmet.frameguard())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

/* GET home page. */
app.get('/', function (req, res, next) {
  res.render('index', { title: '자막 입력 페이지' })
})

/* GET script page. */
app.get('/script', function (req, res, next) {
  res.render('script', { title: '자막 표시 페이지' })
})

/* GET raffle page. */
app.get('/raffle', function (req, res, next) {
  res.render('raffle', { title: '추첨 페이지' })
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
