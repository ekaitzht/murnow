angular.module('murnow')
.controller('Profile', [
'$scope','User','$state', '$stateParams','$upload', 'Auth', 'Amazon','$mdDialog','$http', 'configMurnow',
function($scope, User, $state, $stateParams, $upload, Auth, Amazon, $mdDialog, $http, configMurnow){
	
	 	 $scope.cdn = configMurnow.cdn_domain_name;
	 	 $scope.enviroment = configMurnow.enviroment;
	 	 
	 	 
 	Auth.currentUser().then(function (user){
	 	if(parseInt($stateParams.id) === user.id) { // if the user that we are is logged we have to modify profile view 
		 	$scope.publicProfile = false;
	 	} else {
		 	$scope.publicProfile = true;
	 	}
	   
	}, function(error) {
		
    });
        

	$scope._fetchDataUser =  function() {
      User.getSkinProblems().success(function(data, status, headers, config) {
	    $scope.user.skin_problems =  data.skin_problems; 
	    $scope.hasSkinProblems = false;
	    
	    
		var ageDifMs = Date.now() - Date.parse($scope.user.age);
		var ageDate = new Date(ageDifMs); // miliseconds from epoch
    	$scope.user.ageView = Math.abs(ageDate.getUTCFullYear() - 1970);
    	
    	
	    var userInfo = [$scope.user.ageView, $scope.user.skin_type, $scope.user.skin_tone];
		
		if ($scope.user.eye_color !== null) { userInfo.push($scope.user.eye_color + " eye")}
		
		if(data.skin_problems[0].state){
			userInfo.push(data.skin_problems[0].name);
		}
		
		if(data.skin_problems[1].state){
			userInfo.push(data.skin_problems[1].name);
		}
		
		if(data.skin_problems[2].state){
			userInfo.push(data.skin_problems[2].name);
		}
		
		
		$scope.biometrics = $.grep(userInfo,function(n){ return(n) }).join(', ');
		
		
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
		  	$scope.user.isProfileAuthenticated = false;
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
