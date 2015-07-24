angular.module('murnow')
.controller('MainCtrl', 
['$scope','$rootScope',
'$state',
'$stateParams',
'$mdDialog',
'products',
'configMurnow',
function($scope, $rootScope, $state,$stateParams, $mdDialog, products, configMurnow){
	
  		$scope.cdn = configMurnow.cdn_domain_name;
  		$scope.enviroment = configMurnow.enviroment;
  		
  		products.getMostPopularReviews().success(function(data){
		
			for (i = 0; i <= 3; i++) {
				
				if( data[i] === undefined) {
					data[i].hash_url_image = "/assets/anonymousUser.jpg";	
				}
			} 
			$scope.mostPopularReviews = data;
		});
	
}]);