angular.module('flapperNews')
.controller('AuthCtrl', [
'$scope',
'$state',
'Auth',
'users',
'$stateParams',
function($scope, $state, Auth, users, $stateParams){

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


  $scope.resetPassword = function(resetPasswordForm) {
      $scope.errors = {};

      users.resetPassword(resetPasswordForm.email
      ).success(function(data) {
         $scope.successfulMessage = "Check your inbox email to change your password please!";
      }).error(function(error){
          if ( error.errors.hasOwnProperty("email") ) { $scope.errors.emailNotFoundReset = "We can not find the email"; }  
      });
     /* var resetPasswordusers.resetPassword(resetPasswordForm.email);
      resetPasswordPromise.then(function(result) {
        if ( result.hasOwnProperty("email") ) { $scope.emailNotFoundReset = "We can not find the email"; }
      });*/
    };

  $scope.changePassword = function(changePassword) {
    users.changePassword(changePassword.newPassword, changePassword.confirmPassword, $stateParams.resetToken);
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