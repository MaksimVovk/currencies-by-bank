const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const history = require('connect-history-api-fallback')
const app = express()
const staticFileMiddleware = express.static(path.join(__dirname + '../../../../dist'))

app.use(staticFileMiddleware)

app.use(cors({
  origin: (origin, callback) => callback(null, true),
  credentials: true,
}))

app.use(history({
  disableDotRule: true,
  verbose: true
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use('/', require(`${__dirname}/api/exchange-rates-by-range`))
app.use('/', require(`${__dirname}/api/exchange-rates`))
app.use('/', require(`${__dirname}/api/bank-list`))

app.use(staticFileMiddleware);

app.listen(3000, function () {
  console.log('App listening on port 3000!') //eslint-disable-line
})
