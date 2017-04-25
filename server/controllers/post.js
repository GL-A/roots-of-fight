const app = require('./../server')
  ,db = app.get('db')
  ,jwt = require('jsonwebtoken')
  ,bcrypt = require('bcryptjs')
  ,_ = require('lodash')
  ,config = require('./../config.js');

  module.exports = {
    postToOrder: function(req, res, next) {
      var productId = req.body.orderDetails["id"];
      var size = req.body.orderDetails["size"];
      var qty = req.body.orderDetails["qty"];
      var token = JSON.parse(req.body.token).token;
      var decoded;
      var userId;
      try {
        decoded = jwt.verify(token, config.secret);
      } catch(e) {
        return Promise.reject(e);
      }
      userId = decoded["id"];

      db.get.check_order([userId], function(err, orderRes) {
        if(err) {
          console.log(err);
        }
        if(orderRes.length === 0){

          db.post.products_to_order([userId, productId, size, qty], function(err, pToORes){
            if(err){
              console.log('err', err)
              res.send(err);
            }
            else {
              console.log('posted');
              res.send(pToORes);
            }

          })
        }
        if (orderRes.length > 0) {
          var orderId = orderRes.order_id;
          db.get.update_order_check([userId, productId], function(err, updateOrderRes){
            if(err) {
              console.log(err);
              res.send(err);
            }
            else {
              db.get.match_size([userId, productId, size], function(err, matchSizeRes) {
                // console.log(matchSizeRes, 'match');
                if(err){
                  console.log(err);
                  res.send(err);
                }
                if(matchSizeRes.length === 0) {
                  db.post.products_to_order([userId, productId, size, qty], function(err, newPostRes) {
                    if(err){
                      console.log(err);
                      res.send(err);
                    }
                    else {
                      console.log('new item posted');
                      res.send(newPostRes);
                    }
                  })
                }
                else{
                  var orderId = matchSizeRes[0].order_id;
                   var updatedQty = JSON.parse(matchSizeRes[0].qty) + qty;
                  db.put.update_order([orderId, updatedQty], function(err, update_orderRes) {
                    if(err){
                      res.send(err);
                    }
                    else{
                      console.log(update_orderRes);
                      res.send(update_orderRes);
                    }
                    // console.log('pls baby jesus');
                  })
                }
              })
            }
          })
        }
      })

    },
    postAddress: function(req, res, next){
      console.log(req.body.address.street);
      console.log(req.headers.token);
      var token = req.headers.token;

      var street = req.body.address.street;
      var city = req.body.address.city;
      var state = req.body.address.state;
      var country = req.body.address.country;
      var zip = req.body.address.zipcode;
      var phone = req.body.address.phone;
      var first = req.body.address.name;
      var last = req.body.lastname;
      var company = req.body.company;
      var apt = req.body.apt;

      var decoded;
      var userId;
      try {
        decoded = jwt.verify(token, config.secret);
      } catch(err) {
        return Promise.reject(err);
      }
      userId = decoded.id;

      db.post.address([userId, street, city, state, country, zip, phone, first, last, company, apt], function(err, postRes){
        if(err){
          res.send(err);
        } else{
          res.send(true);
        }
      })
    }




  };


  // var decoded;
  //
  //   try {
  //     decoded = jwt.verify(token, secret);
  //     console.log('verified?');
  //   } catch(e) {
  //     return Promise.reject();
  //   }
  //   decoded.user;
  //   console.log(decoded);
