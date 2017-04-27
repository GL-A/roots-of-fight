angular.module('app')
  .controller('navCtrl', function($scope, $state, productsSvc) {

    $scope.display = {
      div: 1
    };
    $scope.toggle = false;
    var listObj = {
      "SHOP": [
        "- SHOP ALL -",
        "CARDIGANS",
        "TEES",
        "TANKS",
        "SWEATSHIRTS",
        "SWEATPANTS",
        "SHORTS",
        "HATS",
        "JACKETS",
        "WOMEN'S",
        "GIFT CARDS"
    ],
      "BOXING": [
        "- ALL BOXERS -",
        "MUHAMMAD ALI",
        "MIKE TYSON",
        "JULIO CESAR CHAVEZ",
        "JOE FRAZIER",
        "ROCKY MARCIANO",
      ],
      "MARTIAL ARTS": [
        "- ALL MARTIAL ARTS -",
        "BRUCE LEE",
        "CHUCK LIDDELL",
        "ROYCE GRACIE"
      ],
      "BASEBALL": [
        "- ALL BASEBALL -",
        "JACKIE ROBINSON",
        "BABE RUTH"
      ],
      "BASKETBALL": [
        "- ALL BASKETBALL -",
        "ALLEN IVERSON",
        "SHAQ"
      ],
      "FOOTBALL": [
        "- ALL FOOTBALL -",
        "WALTER PAYTON",
        "BARRY SANDERS"
      ],
      "COLLECTIONS": [
        "PROFESSIONAL WRESTLING",
        "THRILLA IN MANILA",
        "MMA LEGENDS"
      ]
    };
    $scope.goToAccount = function(){
      if(localStorage.length >= 1){
        $state.go("account");
      } else{
        $state.go("accountLogin");
      }
    }
    $scope.getList = function(param){
      $scope.menuList = listObj[param];
    }
    $scope.getList();
    var token;
    if(localStorage.length >= 1){
      productsSvc.cartLength().then(function(res){
        $scope.cartLength = res;
      })
    } else{
      $scope.cartLength = 0;
    }

  })
