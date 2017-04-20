const app = require('./../server')
  ,db = app.get('db');

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
};
