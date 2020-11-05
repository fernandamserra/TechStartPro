const bodyParser = require('body-parser');

const express = require('express');
//const cors = require('cors')

const app = express();

const routes = require('./routes');

app.use(bodyParser.json());

app.use(routes);

//app.use(cors());

module.exports = app;