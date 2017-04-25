angular.module('app')
  .controller('LoginController', function($scope, userSvc, $state){
    $scope.test = 'test';

    $scope.login = function(user) {
      userSvc.login(user).then(function(res) {
        $state.go('home');
      })
    }






  })
