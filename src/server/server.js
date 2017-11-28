const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const router = require('./routes/index.js');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const server = express();

server.use(favicon(path.join(__dirname, '..', 'client', 'img', 'favicon.ico')));

server.use(express.static(path.join(__dirname, '..', 'client')));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(compression());

server.engine(
  'hbs',
  hbs({
    defaultLayout: 'layout',
    layoutsDir: path.join(__dirname, '..', 'server/views/layouts'),
    partialsDir: path.join(__dirname, '..', 'server/views/partials'),
    extname: 'hbs'
  })
);

server.set('view engine', 'hbs');
server.set('views', path.join(__dirname, '../', 'server/views'));

server.use(router);

module.exports.server = server;
