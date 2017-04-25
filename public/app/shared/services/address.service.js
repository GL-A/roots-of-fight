angular.module('app')
  .service('addressSvc', function($http) {
    var token = JSON.parse(localStorage.getItem('tokenObj')).token;

    this.postAddress = function(address){
      return $http ({
        method: "POST",
        url: "/api/address",
        data: {
          address: address
        },
        headers: {
          "token": token
        }
      })
    }
  })
