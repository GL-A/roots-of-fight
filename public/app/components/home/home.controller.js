angular.module('app')
  .controller('HomeController', function($scope, productsSvc) {
    $scope.mainImgSlider = [
      "./assets/images/main/home-slider-slide-4.jpg",
      "./assets/images/main/home-slider-slide-5.jpg"
    ];

    // productsSvc.getProducts().then(function(res){
    //   $scope.newReleases = res.newReleases;
    // });
    productsSvc.getNew().then(function(res){
      // console.log(res);
        $scope.newReleases = res;
    })

    $scope.collectionImgs = [
      "./assets/images/main/collections_ad/home-widget-image-text-1 (1).jpg",
      "./assets/images/main/collections_ad/home-widget-image-text-2.jpg",
      "./assets/images/main/collections_ad/home-widget-image-text-3.jpg",
      "./assets/images/main/collections_ad/home-widget-image-text-4.jpg"
    ]
  })
