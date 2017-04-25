angular.module('app')
  .controller('ProductDetailsController', function($scope, productsSvc, $stateParams){
    $scope.productCollection = $stateParams.id;
    $scope.productName = $stateParams.name;
    $scope.sizeUl = [{size: "Small"},{size: "Medium"},{size: "large"},{size: "X-Large"},{size: "XX-Large"},{size: "XXX-Large"}];

    productsSvc.getProducts($scope.productName).then(function(res){
      $scope.product = res.productDetails;
    });

    $scope.addToCart = function(product, pSize, qty){
      var orderDetails = {
        id: product,
        size: pSize.size,
        qty: qty
      };
      productsSvc.addToOrders(orderDetails).then(function(res){
        
      });
    }


  })
