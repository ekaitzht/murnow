angular.module('murnow')
.controller('RequestProductCtrl',
  ['$http','$scope', 'Dialog', 'Auth', 'Intercom',
function($http, $scope, Dialog, Auth, Intercom){
	$scope.application = {
		brand_name: null,
		product_name:null,
		optional_message:null,
		email: null	
	}
	
	$scope.sentRequest = false;
	
	Auth.currentUser().then(function (user){
	 	$scope.isAuth = true;
	 	$('#email').attr("disabled", true);
	 	$scope.user = user;
	   
	}, function(error) {
		$scope.isAuth = false;
    });
	
	
	$scope.requestProduct = function(){

	 	/*if($scope.hasOwnProperty('user')) {
			$scope.application.user_id = $scope.user.user_id; 
			Intercom.requestProduct($scope.application);
			$scope.sentRequest = true;

		} else { */
			$http.put('/api/requests/', {application: $scope.application} ).success(function(data){
	 			$scope.sentRequest = true;
		 	}).error(function(err){
			 	
			 	
		 	});
		/*}*/
 	}
 	
 	
 	$scope.closeDialog = function() {
	 	$scope.sentRequest = false;
    	Dialog.hide();
	};
  


}]);