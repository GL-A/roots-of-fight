angular.module('app').directive('navDir', function(){
  return {
    restrict: '',
    templateUrl: './app/shared/directives/nav/nav.html',
    controller: 'navCtrl',
    link: function (scope, elem, attr){
      var listChecker;
      $('.web-li').on('click', function(){
        var list = scope.menuList;
        if(list === undefined || listChecker === list){
          $('.web-li-dropdown').css('height', '0');
          listChecker = [];
        }
        else{
          $('.web-li-dropdown').css('height', '30' * scope.menuList.length + 'px');
          listChecker = scope.menuList;
        }
      })

    }
  }
})
