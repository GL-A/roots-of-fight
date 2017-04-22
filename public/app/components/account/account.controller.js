angular.module('app')
  .controller('AccountController', function($scope, $state) {
    $scope.logOut = function(){
      localStorage.removeItem('tokenObj');
      $state.go('home');

    }
  })
