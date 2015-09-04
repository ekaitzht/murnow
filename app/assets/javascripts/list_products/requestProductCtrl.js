angular.module('murnow')
.controller('RequestProductCtrl',
  ['$http','$scope', '$mdDialog',
function($http, $scope, $mdDialog){
	$scope.application = {
		brand_name: null,
		product_name:null,
		optional_message:null
	}
	
	 $scope.requestProduct = function(){
	 	$http.put('/api/requests/', {application: $scope.application} ).success(function(data){
	 	
	 	
	 	}).error(function(err){
		 	
		 	
	 	});
 	}


}]);