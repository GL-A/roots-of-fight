angular.module('app')
  .service('userSvc', function($http){


    this.createUser = function(user){
      return $http({
        method: 'POST',
        url: 'api/users',
        data: {
          firstname: user.firstname,
          lastname: user.lastname,
          emailaddress: user.emailaddress,
          password: user.password
        }
      }).then(function(res){
        console.log("create user", res);
        var token = res.headers()['x-auth'];
        var tokenObj = {'token': token}
        localStorage.setItem('tokenObj', JSON.stringify(tokenObj));
        return res;
      })
    }
    this.login = function(user){
      return $http({
        method: 'POST',
        url: `/api/users/login`,
        data: {
          email: user.email,
          password: user.password
        }
      }).then(function(res) {
        if(res.data === true){
          var token = res.headers()['x-auth'];
          var tokenObj = {'token': token}
          localStorage.setItem('tokenObj', JSON.stringify(tokenObj));
        }

        return res.data;
      })

    }


  })
