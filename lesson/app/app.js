const express = require('express')
const logger = require('morgan')
const session = require('express-session')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
require('dotenv').config()

const app = express()

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

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json());


app.use(logger('dev'))

module.exports = app;
