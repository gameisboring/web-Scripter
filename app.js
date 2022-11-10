var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const helmet = require('helmet')
const models = require('./models')

var app = express()

app.io = require('./socket')(app)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// helmet middleware
// app.use(helmet.crossOriginResourcePolicy('same-site'))
app.use(helmet.hidePoweredBy())
// app.use(helmet.xssFilter())
// app.use(helmet.noSniff())
// app.use(helmet.frameguard())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

/*
 * GET 홈페이지
 */
app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/views/index.html')
})

/**
 * GET 스크립트가 표시되는 화면
 */
app.get('/script', (req, res, next) => {
  res.sendFile(__dirname + '/views/script.html')
})

/**
 * GET 스크립트 데이터 뿌려주기
 */
app.get('/script/data', async (req, res) => {
  const data = await models.Script.findOne({
    order: [['updatedAt', 'DESC']],
  })

  data ? res.send(data) : console.log('Not found !')
})

/**
 * POST 스크립트 데이터 입력
 */
app.post('/script/data', (req, res) => {
  if (req.body.author && req.body.text) {
    models.Script.create({
      author: req.body.author,
      text: req.body.text,
    }).then(() => {
      console.log(`데이터 입력 | ${author} / ${text}`)
      res.json({ staus: 200, ok: true })
    })
  }

  res.status(500).send('예측하지 못한 데이터')
})

/* GET 추첨 페이지 */
app.get('/raffle', (req, res) => {
  res.sendFile(__dirname + '/views/raffle.html')
})

/**
 * GET 추첨 페이지 설정 가져오기
 */
app.get('/raffle/config', async (req, res) => {
  const data = await models.Raffle.findOne({
    order: [['updatedAt', 'DESC']],
  })
  res.send(data)
})

/**
 * POST 추첨 페이지 설정 입력
 */
app.post('/raffle/config', async (req, res) => {
  console.log(req.body)
  if (req.body.length && req.body.range && req.body.useSound) {
    console.log(req.body)
    const [instance, created] = await models.Raffle.upsert({
      useSound: req.body.useSound,
      numLength: req.body.length,
      numRange: req.body.range,
    })
    if (created) {
      res.json({ staus: 200, ok: true })
    }
  }
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
  res.sendFile(__dirname + '/views/error.html')
})

module.exports = app
