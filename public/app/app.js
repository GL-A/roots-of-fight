angular.module('app', ['ui.router', 'ngAnimate'])
  .config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: './app/components/home/home.html',
        controller: 'HomeController',
      })
      .state('shopCollection', {
        url: '/collections/:id',
        templateUrl: './app/components/collections/collections.html',
        controller: 'CollectionsController'
      })
      .state('productDetails', {
        url: '/collection/:id/:name',
        templateUrl: './app/components/productDetails/productDetails.html',
        controller: 'ProductDetailsController'
      })

  });
