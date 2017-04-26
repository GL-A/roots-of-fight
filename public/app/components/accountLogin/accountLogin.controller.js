angular.module('app')
  .controller('LoginController', function($scope, userSvc, $state, $timeout){
    $scope.test = 'test';

    $scope.login = function(user) {
      userSvc.login(user).then(function(res) {
          if(res === true){
            console.log("true")

            $state.go('home');
          }


          console.log(res);

      })
    }







  })
