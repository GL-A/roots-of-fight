angular.module('app')
  .controller('LoginController', function($scope, userSvc){
    $scope.test = 'test';

    $scope.login = function(user) {
      userSvc.login(user).then(function(res) {
        console.log(res);
      })
    }






  })
