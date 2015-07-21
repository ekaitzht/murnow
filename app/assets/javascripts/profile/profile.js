angular.module('murnow')
.controller('Profile', [
'$scope','User','$state', '$stateParams','$upload', 'Auth', 'Amazon','$mdDialog','$http', 
function($scope, User, $state, $stateParams, $upload, Auth, Amazon, $mdDialog, $http){
	
	 
		$scope._fetchDataUser =  function() {
          User.getSkinProblems().success(function(data, status, headers, config) {
		    $scope.user.skin_problems =  data.skin_problems; 
		  });
		  
		 User.getReviewsUser($scope.user.id).success(function(data, status, headers, config) {
			  
		    $scope.reviews =  data.reviews; 
		  });
    }  
    
    
  	if(Auth.isAuthenticated()) {
	  if(parseInt($stateParams.id) == User.user_session.id) {
	  	$scope.user = User.user_session;
	  	$scope.user.isProfileAuthenticated = true;
	  	$scope._fetchDataUser();
      }  else {
	    User.getPublicUser($stateParams.id).then(function(res) {
		  $scope.user = res.data;
		  $scope._fetchDataUser();
	  	});
      }
  	} else {
	  	User.getPublicUser($stateParams.id).then(function(res) {
		  	$scope.user = res.data;
		  	$scope._fetchDataUser();
	  	});
  	}
  	
  	$scope.getS3PolicyDocument = function(){
	    Amazon.getS3PolicyDocument().success(function(data) {
	         Amazon.policy = data.policy;
	         Amazon.signature = data.signature;
	         Amazon.unique_name_file_hash = data.unique_name_file_hash;
	         Amazon.folder = data.folder;
	         
	    }).error(function(error){
         
    	});
  	};
 
	$scope.myImage= '';
	$scope.myCroppedImage = '';
	$scope.fileImage = '';
	$scope.skin_types = ['Dry','Combination','Oily'];
	$scope.skin_colors = ['Porcelain','Ivory', 'Beige','Caramel','Mocha','Dark Chocolate'];
	$scope.skin_tones = ['Warm', 'Neutral', 'Cool'];
 


      
    
    Auth.currentUser().then(function(user) {
       	 User.setUser(user);
         $state.go('profile');
    }, function(error) {
        // unauthenticated error
    });


	$scope.goToProduct = function(product_id){
		$state.go('products', { id: product_id});
	}
 
 

}]);
