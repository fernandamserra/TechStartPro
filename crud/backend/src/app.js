const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors')

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Meethods", "GET, PUT, POST, DELETE, OPTIONS"); // update to match the domain you will make the request from
  next();
});

const routes = require('./routes');

app.use(bodyParser.json());

app.use(routes);

app.use(cors());

module.exports = app;