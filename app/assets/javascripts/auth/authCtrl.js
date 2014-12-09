angular.module('flapperNews')
.controller('AuthCtrl', [
'$scope',
'$state',
'Auth',
function($scope, $state, Auth){

  $scope.login = function() {
    Auth.login($scope.user).then(function(){
      $state.go('home');
    }).then(function(response) {
        // Successfully recovered from unauthorized error.
        // Resolve the original request's promise.

    }, function(error) {
        // There was an error logging in.
        // Reject the original request's promise.
        $scope.login.errorMessage = error.data.error;
    });
  };

  $scope.register = function() {
    Auth.register($scope.user).then(function(){
      $state.go('home');
    }).then(function(response) {
        // Successfully recovered from unauthorized error.
        // Resolve the original request's promise.

    }, function(error) {
        // There was an error logging in.
        // Reject the original request's promise.
        $scope.register.errorMessage = error.data.error;
    });
  };
  
}]);