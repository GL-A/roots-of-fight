angular.module('app')
  .service('productsSvc', function($http){

    this.getProducts = function(param) {
      return $http({
        method: "Get",
        url: "/api/products"
      }).then(function(res){
        var productObj = res.data;

        var newReleases = productObj.filter(function(obj){
          return obj.collections.includes('new')? obj.collections: null;
        })
        var byName = productObj.filter(function(obj){
          return obj.collections.includes(param)? obj.collections: obj.type.includes(param)? obj.type: null;
        })
        var productDetails = productObj.filter(function(obj){
          return obj.name.includes(param)? obj.name: null;
        })

        var resObj = {
          newReleases: newReleases,
          byName: byName,
          productDetails: productDetails
        };

        return resObj;
      })
    }
  })
