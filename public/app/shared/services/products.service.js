angular.module('app')
  .service('productsSvc', function($http){
    this.cartLength = function(){
      var token = JSON.parse(localStorage.getItem('tokenObj')).token;

      return $http({
        method: "GET",
        url: "/api/cart",
        headers: {
          "token": token
        }
      }).then(function(res){
        var amount = res.data.length;
        return amount;
      })
    }

    this.getProducts = function(param) {
      return $http({
        method: "Get",
        url: "/api/products"
      }).then(function(res){
        var productObj = res.data;
        var newReleases = productObj.filter(function(obj){
          return obj.collections.includes('new')? obj.collections: null;
          console.log(obj);
        })
        var byName = productObj.filter(function(obj){
          return obj.collections.includes(param)? obj.collections: obj.type.includes(param)? obj.type: null;
        })
        var productDetails = productObj.filter(function(obj){
          return obj.name.includes(param)? obj.name: null;
        })


        var cartProducts = param;


        if(localStorage.getItem("tokenObj") != null){
          cartProducts = productObj.filter(function(obj) {
            return cartProducts.includes(obj.id);
          })
        }

        var resObj = {
          newReleases: newReleases,
          byName: byName,
          productDetails: productDetails,
          cartProducts: cartProducts
        };
        return resObj;
      })
    }
    this.getNew = function() {
      return $http({
        method: "Get",
        url: "/api/products"
      }).then(function(res){
        var productObj = res.data;

        var newReleases = productObj.filter(function(obj){
          return obj.collections.includes('new')? obj.collections: null;
          console.log(obj);
        })

        return newReleases;
      })
    }
    this.addToOrders = function(orderDetails){
      var token = localStorage.getItem('tokenObj');
      return $http({
        method: "POST",
        url: "/api/products",
        data: {
          orderDetails: orderDetails,
          token: token
        }
      }).then(function(res) {
        return res;
      })
    }

    this.getUserProducts = function() {
      var token = JSON.parse(localStorage.getItem('tokenObj')).token;
      return $http({
        method: "GET",
        url: '/api/userProducts',
        headers: {
          "token": token
        }
      }).then(function(res) {
        return res.data;
      })
    }

  })
