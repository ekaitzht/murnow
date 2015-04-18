angular.module('murnow')
.controller('Profile', [
'$scope','User','$state','$upload', 'Auth', 'Amazon','$mdDialog','$http', 
function($scope, User, $state, $upload, Auth, Amazon, $mdDialog, $http){
	
 $scope.user = User.user_session;
 $scope.myImage= '';
 $scope.myCroppedImage = '';
 $scope.fileImage = '';
 $scope.skin_types = ['Dry','Combination','Oily'];
 $scope.skin_colors = ['Porcelain','Ivory', 'Beige','Caramel','Mocha','Dark Chocolate'];
 $scope.skin_tones = ['Warm', 'Neutral', 'Cool'];
 


  User.getSkinProblems().success(function(data, status, headers, config) {
    $scope.user.skin_problems =  data.skin_problems; 
  });
  
  User.getReviewsUser($scope.user.id).success(function(data, status, headers, config) {
	  
    $scope.reviews =  data.reviews; 
  });
  

  $scope.updateUser = function() {
    if ($scope.fileImage !== '') {
		Amazon.uploadUserProfilePhoto($scope.fileImage).progress(function(evt) {
		
		    var percent =  parseInt(100.0 * evt.loaded / evt.total);
		
		    console.log('progress: ' +percent + '% file :'+ evt.config.file.name);
		  }).success(function(data, status, headers, config) {
		    // file is uploaded successfully
		
		    var imageUrl = "https://s3.amazonaws.com/murnow/" + Amazon.folder + Amazon.unique_name_file_hash;
		    var random = (new Date()).toString();
		    $scope.user.image= imageUrl + "?cb=" + random;
		    console.log('file ' + config.file.name + 'is uploaded successfully. Response: ' + data);
		}).error(function(err){
		
		});    
    } 

      
    User.updateUserProfile($scope.user, $scope.skin_problems)
    
    Auth.currentUser().then(function(user) {
       	 User.setUser(user);
         $state.go('profile');
    }, function(error) {
        // unauthenticated error
    });
  };

  $scope.getS3PolicyDocument = function(){
    Amazon.getS3PolicyDocument().success(function(data) {
         Amazon.policy = data.policy;
         Amazon.signature = data.signature;
         Amazon.unique_name_file_hash = data.unique_name_file_hash;
         Amazon.folder = data.folder;
    }).error(function(error){
         
    });
  };
 
  $scope.$watch('file', function(newValue, oldValue) {
      if (newValue === oldValue) {
        return; 
      } 

      if ( ($scope.file[0].size/1024) >= 2048 ) { // if the file is bigger than  2048 KB
        $mdDialog.show(
          $mdDialog.alert()
            .title('Photo too big')
            .content('Size of the photo is too big you need  a file with less than 2MB!')
            .ariaLabel('Password notification')
            .ok('Got it!')
        );
        return;      
      } 
      var file = $scope.file[0];
      
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
	       $mdDialog.show({
            controller: 'CropImageCtrl',
            templateUrl: 'profile/_dialogCropImage.html',
            hasBackdrop: true,
            clickOutsideToClose: false,
            locals: {myImage: evt.target.result, scopeEditProfile: $scope}
          });

        });
      };
      reader.readAsDataURL(file);
  });
  
    $scope.goToProduct = function(product_id){
	  $state.go('products', { id: product_id});
  }

}]);
