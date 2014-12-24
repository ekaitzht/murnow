angular.module('flapperNews')
.controller('AuthCtrl', [
'$scope',
'$state',
'Auth',
'users',
'$stateParams',
'$cookies',
'$mdDialog',
'$rootScope',
function($scope, $state, Auth, users, $stateParams, $cookies, $mdDialog, $rootScope){
 
  $scope.login = function() {
  
    $scope.errors = {};

    Auth.login($scope.user).then(function(ev){
        $state.go('home');
    }).then(function(response) {
        // Successfully recovered from unauthorized error.
        // Resolve the original request's promise.

    }, function(error) {
        $scope.errors.errorPasswordEmail = error.data.error; 
    });
  };


  $scope.resetPassword = function() {
      $scope.errors = {};

      users.forgotPassword($scope.resetPasswordForm.email
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
    $scope.errors = {};
    users.changePassword(changePassword.newPassword, changePassword.confirmPassword, $stateParams.resetToken).
      success(function(data) {
        $scope.login();
      }).error(function(error){
         if ( error.errors.hasOwnProperty("reset_password_token") ) {
          $scope.errors.errorReset = "Your link has expired"; // Reset token invalid.
        }  
         if ( error.errors.hasOwnProperty("password_confirmation") ) {
          $scope.errors.errorReset = error.errors.password_confirmation[0]; // Reset token invalid.
        }  
      });
  };


  $scope.register = function() {

    $scope.errors = {};
    Auth.register($scope.user).then(function(){
     
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
          $scope.errors.errorPassword = "Password "+ errors.password[0];
        }
        if ( errors.hasOwnProperty("username") ) {
          $scope.errors.errorName = "Name " + errors.username[0];
        }
    });
  };
  
  $scope.$on('$stateChangeSuccess', 
    function(event, toState, toParams, fromState, fromParams) {
      users.fromState = fromState.name;
      // I want get the 'person' value in this function, what should I do?
  });

  $scope.showDialogForgotPassword = function() {
    
    $mdDialog.show({
            controller: 'AuthCtrl',
            templateUrl: 'auth/_forgotpassword.html',
            hasBackdrop: true,
            clickOutsideToClose: true
          });
  };

  $scope.showDialogRegister= function() {
  
     $mdDialog.show({
            controller: 'AuthCtrl',
            templateUrl: 'auth/_register.html',
            hasBackdrop: true,
            clickOutsideToClose: true
          });
  };

}]);