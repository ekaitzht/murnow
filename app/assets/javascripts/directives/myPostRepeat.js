angular.module('myPostRepeat', [])
.directive('myPostRepeat', function($rootScope, $location) {
  return function(scope, element, attrs) {
    if (scope.$last){
		if ($rootScope.destState === "list_products" &&  $rootScope.fromState === "products") {
		  			  	
		  $("md-content").scrollTop($rootScope.scrollProductsPosition);
		  //$location.hash($rootScope.idProductClicked);
		}
    }
  };
});