angular.module('murnow')
.controller('Profile', [
'$scope','User','$state', 'Auth', 'Amazon',
function($scope, User, $state, Auth, Amazon){
	
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
         $scope.policy = data.policy;
         $scope.signature = data.signature;
    }).error(function(error){
         
    });
  };

}]);
