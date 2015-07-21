angular.module('murnow')
.controller('MainCtrl', 
['$scope','$rootScope',
'$state',
'$stateParams',
'$mdDialog',
'products',
function($scope, $rootScope, $state,$stateParams, $mdDialog, products){
	

	 products.getMostPopularReviews().success(function(data){
		
		for (i = 0; i <= 3; i++) {
			
			if( data[i] === undefined) {
				data[i].image = "/assets/anonymousUser.jpg";	
			}
		} 
		$scope.mostPopularReviews = data;
	});
	
	
	

}]);