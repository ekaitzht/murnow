angular.module('murnow')
.controller('MainCtrl', 
['$scope','$rootScope',
'$state',
'$stateParams',
'$mdDialog',
'products',
'configMurnow',
function($scope, $rootScope, $state,$stateParams, $mdDialog, products, configMurnow){
	
  		var cdn = configMurnow.cdn_domain_name;
  		var enviroment = configMurnow.enviroment;
  		
  		products.getMostPopularReviews().success(function(data){
		
			for (i = 0; i <= 3; i++) {
				
				if( data[i] === undefined) {
					data[i].hash_url_image = "/assets/anonymousUser.jpg";	
					data[i].urlImageUser = "https://"+cdn+"/profile_images_"+enviroment+"/"+data[i].hash_url_image;

				} else {
				   	data[i].urlImageUser = "https://"+cdn+"/profile_images_"+enviroment+"/"+data[i].hash_url_image;

				}
				
				if( data[i].body.length >= 103 ) {
					data[i].body = data[i].body.substring(1,103) + '...';
				}
			} 
			$scope.mostPopularReviews = data;
		});
	
}]);