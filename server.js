'use strict'

var fs = require('fs')
var express = require('express')
var os = require('os')
var app = express()

var indexController = require('./controllers/index');

const TYPE = { UNIX: 0, PARSED_TIME: 1, TODAY: 2 }

if (!process.env.DISABLE_XORIGIN) {
  app.use(function (req, res, next) {
    var allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com']
    var origin = req.headers.origin || '*'
    if (!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1) {
      console.log(origin)
      res.setHeader('Access-Control-Allow-Origin', origin)
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    }
    next()
  })
}

app.use('/public', express.static(process.cwd() + '/public'))
app.set('view engine', 'pug')

app.route('/_api/package.json')
  .get(function (req, res, next) {
    console.log('requested')
    fs.readFile(path.join(__dirname, '/package.json'), function (err, data) {
      if (err) return next(err)
      res.type('txt').send(data.toString())
    })
  })

app.route('/').get(indexController.index)

// Respond not found to all the wrong routes
app.use(function (req, res, next) {
  res.status(404)
  res.type('txt').send('Not found')
})

// Error Middleware
app.use(function (err, req, res, next) {
  if (err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR')
  }
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...')
})
