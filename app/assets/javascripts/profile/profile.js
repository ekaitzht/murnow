angular.module('murnow')
.controller('Profile', [
'$scope','User','$state', 'Auth',
function($scope, User, $state, Auth){
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

}]);
