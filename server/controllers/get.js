const app = require('./../server')
  ,db = app.get('db')
  ,jwt = require('jsonwebtoken')
  ,bcrypt = require('bcryptjs')
  ,_ = require('lodash');

module.exports = {
  getProducts: function(req, res, next){
    db.get.get_products([], function(err, results) {
      if(err){
        console.log(err);
        res.send(err);
      } else {
        res.send(results);
      }
    })
  }
  // createUser: function(req, res, next){
  //   console.log(req.body);
  //   var secret = "34";
  //   var password = req.body.password;
  //   var user = req.body.id;
  //
  //   var token = jwt.sign({id: user.toString()}, secret).toString();
  //   console.log(token);
  //
  //   var decoded;
  //
  //   try {
  //     decoded = jwt.verify(token, secret);
  //     console.log('verified?');
  //   } catch(e) {
  //     return Promise.reject();
  //   }
  //   decoded.user;
  //   console.log(decoded);
  //
  //
  //
  //   bcrypt.genSalt(10, (err, salt) => {
  //     bcrypt.hash(password, salt, (err, hash) => {
  //       console.log('hash', hash)
  //     })
  //   })
  //
  //
  //   var token = jwt.sign(req.body.id, '34');
  //   console.log('token', token);
  //
  //   var decoded = jwt.verify(token, '34');
  //   console.log('decoded', decoded);
  //   console.log('hello');
  //
  // }
};
