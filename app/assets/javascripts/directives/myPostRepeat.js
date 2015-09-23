angular.module('myPostRepeat', [])
.directive('myPostRepeat',  ['$rootScope','$location',function($rootScope, $location) {
  return function(scope, element, attrs) {
		if( ($rootScope.fromState === '' && $rootScope.destState === 'list_products') || ($rootScope.fromState === 'products' && $rootScope.destState === 'list_products')) {	
		  $("md-content").scrollTop($rootScope.scrollProductsPosition);
		  //$location.hash($rootScope.idProductClicked);
		}  	
  };
}]);