angular.module('app')
  .controller('ProductDetailsController', function($scope, productsSvc, $stateParams){
    $scope.productCollection = $stateParams.id;
    $scope.productName = $stateParams.name;
    $scope.sizeUl = [
      "Small",
      "Medium",
      "large",
      "X-Large",
      "XX-Large",
      "XXX-Large"
    ];


    productsSvc.getProducts($scope.productName).then(function(res){
      $scope.product = res.productDetails;
      console.log($scope.product);
    });


  })
