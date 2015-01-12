angular.module('murnow')
.controller('Profile', [
'$scope','User','$state','$upload', 'Auth', 'Amazon',
function($scope, User, $state, $upload, Auth, Amazon){
	
 $scope.user = User.user_session;

  $scope.updateUser = function() {
    
    User.updateUser($scope.user)
    
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
         Amazon.unique_name_file_hash = data.unique_name_file_hash
    }).error(function(error){
         
    });
  };
 
  $scope.$watch('file', function(newValue, oldValue) {
      if (newValue === oldValue) {
        return; 
      }
      var file = $scope.file[0];
      $scope.upload = $upload.upload({
        url: 'https://murnow.s3.amazonaws.com/', 
        method: 'POST',
        data : {
          key: 'images_user_profile/' + Amazon.unique_name_file_hash, // the key to store the file on S3, could be file name or customized
          AWSAccessKeyId: 'AKIAII73EHYMIQ22FBHQ', 
          acl: 'public-read', // sets the access to the uploaded file in the bucket: private or public 
          policy: Amazon.policy, // base64-encoded json policy (see article below)
          signature: Amazon.signature, // base64-encoded signature based on policy string (see article below)
          "Content-Type": file.type, // content type of the file (NotEmpty),
          filename: file.name // this is needed for Flash polyfill IE8-9
        },
        file: file, 
      }).progress(function(evt) {
        console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :'+ evt.config.file.name);
      }).success(function(data, status, headers, config) {
        // file is uploaded successfully

        var imageUrl = "https://s3.amazonaws.com/murnow/images_user_profile/" + Amazon.unique_name_file_hash;
        var random = (new Date()).toString();
        $scope.user.image= imageUrl + "?cb=" + random;
        console.log('file ' + config.file.name + 'is uploaded successfully. Response: ' + data);
      });
   
  });


}]);
