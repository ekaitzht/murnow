angular.module('flapperNews')
.controller('AuthCtrl', [
'$scope',
'$state',
'Auth',
function($scope, $state, Auth){

  $scope.login = function() {
    $scope.errors = {};
    Auth.login($scope.user).then(function(){
      $state.go('home');
    }).then(function(response) {
        // Successfully recovered from unauthorized error.
        // Resolve the original request's promise.

    }, function(error) {
        $scope.errors.errorPasswordEmail = error.data.error; 
    });
  };

  $scope.register = function() {

    $scope.errors = {};
    Auth.register($scope.user).then(function(){
      $state.go('home');
    }).then(function(response) {
        // Successfully recovered from unauthorized error.
        // Resolve the original request's promise.

    }, function(error) {
        // There was an error logging in.
        // Reject the original request's promise.
        errors = error.data.errors;
        if ( errors.hasOwnProperty("email") ) {
          $scope.errors.errorEmail = "Your email "+ errors.email[0];
        }  
        if ( errors.hasOwnProperty("password") ) {
          $scope.errors.errorPassword = "Password min length 8 characters.";
        }
    });
  };
  
}]);