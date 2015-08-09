angular.module('murnow')
.controller('MainCtrl', 
['$scope','$rootScope',
'$state',
'$stateParams',
'$mdDialog',
'products',
'configMurnow',
'User',
function($scope, $rootScope, $state,$stateParams, $mdDialog, products, configMurnow, User){
	
  		var cdn = configMurnow.cdn_domain_name;
  		var enviroment = configMurnow.enviroment;
  		var products = products.products;
	
			for (i = 0; i <= 3; i++) {
				
				if( products[i] === undefined) {
					products[i].hash_url_image = "/assets/anonymousUser.jpg";	
					products[i].urlImageUser = "https://"+cdn+"/profile_images_"+enviroment+"/"+products[i].hash_url_image;

				} else {
				   	products[i].urlImageUser = "https://"+cdn+"/profile_images_"+enviroment+"/"+products[i].hash_url_image;

				}
				
				if( products[i].body.length >= 103 ) {
					products[i].body = products[i].body.substring(0,103) + '...';
				}
			} 
			$scope.products = products;
		
		
		
	
}]);