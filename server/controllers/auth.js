const app = require('./../server')
  ,db = app.get('db')
  ,jwt = require('jsonwebtoken')
  ,bcrypt = require('bcryptjs')
  ,_ = require('lodash')
  ,config = require('./../config.js');

module.exports = {

  createUser: function(req, res, next){
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.emailaddress;
    var password = req.body.password.toString();

    db.get.email_exists([email], function(err, resp) {
      if(resp.length !== 0){
        if(resp[0].userid === null) {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              db.post.user([firstname, lastname, hash], function(err, results) {
                if(err){
                  res.send(err);
                } else {
                  var token = jwt.sign({id: results[0].id.toString()}, config.secret).toString();
                  db.put.add_user_to_email([results[0].id], function(err, response){
                    return res.header('x-auth', token).send(response);
                  })
                }
              })

            })
          })
        }
        else{
          res.send(err);
        }
      }
      else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            db.post.user([firstname, lastname, hash], function(err, results) {
              if(err){
                res.send(err);
              } else {
                var token = jwt.sign({id: results[0].id.toString()}, config.secret).toString();
              
                db.post.create_user_email([results[0].id, email], function(err, respo){
                  return res.header('x-auth', token).send(respo);
                })
              }
            })
          })
        })
      }
    })
  },
  getUser: function(req, res, next) {
    db.get.get_user([req.body.email], function(err, results) {
      if(err){
        console.log(err);
      }
      else {
        bcrypt.compare(req.body.password, results[0].password, (err, result) => {
          if(result){
            var token = jwt.sign({id: results[0].id.toString()}, config.secret).toString();
            return res.header('x-auth', token).send(result);
          }
          else {
            return res.send(false);
          }
        })
      }
    })
      // var password = req.body.password;


      // bcrypt.compare(password, hashpassword, (err, res) => {
      //   console.log(res)
      // })


      // var token = jwt.sign(req.body.id, '34');
      // console.log('token', token);

      // var decoded = jwt.verify(token, '34');
      // console.log('decoded', decoded);
      // console.log('hello');


    // $2a$10$eK1WVRy38GxTzDhjQru/AuoQHBsNbopkSJGdTDz.JTcd8xYV4Jwu.
    // var token = req.headers['x-auth'];
    // var decoded;
    // try {
    //   decoded = jwt.verify(token, config.secret);
    // } catch(e) {
    //   return Promise.reject();
    // }
    // db.get.user([decoded.id], function(err, results) {
    //   if(err){
    //     res.send(err);
    //   } else {
    //     res.send(results);
    //   }
    // })
  }
};
