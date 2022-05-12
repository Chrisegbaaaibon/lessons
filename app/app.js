const express = require('express')
const logger = require('morgan')
const session = require('express-session')
const bodyParser = require('body-parser')
const { db } = require('./database/connection')
const mongoose = require('mongoose')
const router = require('./router/router')
const MongoStore = require('connect-mongo')
require('dotenv').config()

const app = express();

app.use('/api', router)

app.use(session({
  secret: process.env.SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7
  },
  store: new MongoStore({
    mongoUrl: process.env.MONGO_URI
  }),
  resave: true,
  saveUninitialized: true
},
))

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());


app.use(logger('dev'))

app.listen(db)

module.exports = app;
