angular.module('app')
  .controller('AccountController', function($scope, $state, userSvc) {

    userSvc.getEmail().then(function(res){
      console.log(res);
      $scope.email = res;
      // $scope.firstname = res.firstname;
      // $scope.lastname = res.lastname;
      // $scope.address = res.address;
      // $scope.phone = res.phone;
    })

    $scope.logOut = function(){
      localStorage.removeItem('tokenObj');
      $state.go('home');
    }
  })
