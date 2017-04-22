const express = require('express')
  ,session = require('express-session')
  ,massive = require('massive')
  ,bodyParser = require('body-parser')
  ,passport = require('passport')
  ,config = require('./config.js')
  ,jwt = require('jsonwebtoken')
  ,bcrypt = require('bcryptjs')
  ,_ = require('lodash');

  const app = module.exports = express();
  app.use(express.static(__dirname + './../dist'));
  // app.use(express.static(__dirname + './../bower_components'));
  app.use(bodyParser.json());

  const massiveUri = config.MASSIVE_URI;
  const massiveServer = massive.connectSync({
    connectionString: massiveUri
  });

  app.set('db', massiveServer);
  let db = app.get('db');

  const dbSetup = require('./services/dbSetup');
  dbSetup.run();

//endpoints
var getCtrl = require('./controllers/get.js');
var authCtrl = require('./controllers/auth.js');

app.get('/api/products', getCtrl.getProducts);

app.post('/api/users', authCtrl.createUser);
app.post('/api/users/login', authCtrl.getUser);


let port = config.port;
app.listen(port, function () {
  console.log(`Listening on port ${port}`)
})
