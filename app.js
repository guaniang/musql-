var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var our = require('./routes/our.js')


app.listen(3000)

app.use(bodyParser.urlencoded({}))

app.use('/our',our)
