const routes = require('express').Router();
const signup = require('../controllers/signup');


routes.post('/signup', signup.createStudent);

module.exports = routes;