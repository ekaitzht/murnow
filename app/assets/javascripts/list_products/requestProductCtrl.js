angular.module('murnow')
.controller('RequestProductCtrl',
  ['$http','$scope', 'Dialog',
function($http, $scope, Dialog){
	$scope.application = {
		brand_name: null,
		product_name:null,
		optional_message:null
	}
	$scope.sentRequest = false;
	 $scope.requestProduct = function(){
	 	$http.put('/api/requests/', {application: $scope.application} ).success(function(data){
	 	
	 		$scope.sentRequest = true;
	 	}).error(function(err){
		 	
		 	
	 	});
 	}
 	
 	
 	$scope.closeDialog = function() {
	 	$scope.sentRequest = false;
    	Dialog.hide();
	};
  


}]);