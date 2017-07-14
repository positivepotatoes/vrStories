'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');

const app = express();

app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({extended: false}));
app.use(middleware.bodyParser.json());

app.use(middleware.auth.session);
app.use(middleware.passport.initialize());
app.use(middleware.passport.session());
app.use(middleware.flash());

app.use(express.static(path.join(__dirname, '../public/dist/')));

app.use('/', routes.auth);
app.use('/api', routes.api);
app.use('/api/profiles', routes.profiles);

// ADDED BY DAVID WILL PROBABLY REMOVE, THIS IS FOR REACT HASH ROUTER BUT LEAVING FOR NOW JUST IN CASE
app.get('*', (req, res) => {
  console.log('* req', req);
  res.sendFile(path.resolve(__dirname, '../public/dist/index.html'));
});

module.exports = app;
