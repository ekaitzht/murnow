angular.module('murnow')
.controller('MainCtrl', 
['$scope','$rootScope',
'$state',
'$stateParams',
'products',
'configMurnow',
'User',
function($scope, $rootScope, $state,$stateParams, products, configMurnow, User){
  		var cdn = configMurnow.cdn_domain_name;
  		var enviroment = configMurnow.enviroment;
  		var products = products.products;
	
			for (i = 0; i <= 3; i++) {
				
				if( products[i].hash_url_image === null) {
					products[i].hash_url_image = "/assets/anonymousUser.png";	
					products[i].urlImageUser =  "/assets/anonymousUser.png";

				} else {
				   	products[i].urlImageUser = "https://"+cdn+"/profile_images_"+enviroment+"/"+products[i].hash_url_image;

				}
				
				products[i].hash_image_product = "https://"+cdn+"/images_products/"+products[i].hash_image_product + ".jpg";
				
				
				if( products[i].body.length >= 103 ) {
					products[i].body = products[i].body.substring(0,103) + '...';
					
				}
				
				if( products[i].product_name.length >= 18 ) {
					products[i].product_name = products[i].product_name.substring(0, 18) + '...';
					
				}
				
				if(products[i].repurchase === 'false'){
					products[i].repurchase = false;
				} else{
					products[i].repurchase = true;
				}
				
			
			} 
			$scope.products = products;
		
		
		
	 

  		

}]);