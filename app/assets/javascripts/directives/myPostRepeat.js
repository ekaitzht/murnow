angular.module('myPostRepeat', [])
.directive('myPostRepeat',  ['$rootScope','$location',function($rootScope, $location) {
  return function(scope, element, attrs) {
		  			  	
		  $("md-content").scrollTop($rootScope.scrollProductsPosition);
		  //$location.hash($rootScope.idProductClicked);
  };
}]);