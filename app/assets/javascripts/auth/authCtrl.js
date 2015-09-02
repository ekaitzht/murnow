angular.module('murnow')
.controller('AuthCtrl', [
'$scope',
'$state',
'Auth',
'User',
'$stateParams',
'$cookies',
'$mdDialog',
'$rootScope',
function($scope, $state, Auth, User, $stateParams, $cookies, $mdDialog, $rootScope){
  $scope.login = function() {   
  
    $scope.errors = {};

    Auth.login($scope.user).then(function(ev){
       
    }).then(function(response) {
        // Successfully recovered from unauthorized error.
        // Resolve the original request's promise.

    }, function(error) {
        if (error.data.error == "You have to confirm your email address before continuing.") {
          $scope.sendConfirm = true;
          $scope.errors.errorPasswordEmail = "You can't login because your confirmation email has expired, Click the button to resend confirmation instructions"
        } else {
          $scope.sendConfirm = false;
          $scope.errors.errorPasswordEmail = error.data.error; 
        }
    });
  };

  $scope.sendConfirmationInstructions = function(email){
    $mdDialog.show(
      $mdDialog.alert()
        .title('Email sent!')
        .content('We have sent you the confirmation instructions to your email address.')
        .ariaLabel('Password notification')
        .ok('Got it!')
    );
    User.send_confirmation_instructions(email);
  }


  $scope.resetPassword = function() {
      $scope.errors = {};

      User.forgotPassword($scope.resetPasswordForm.email
      ).success(function(data) {
         $scope.successfulMessage = "Please check your inbox email to change your password.";
      }).error(function(error){
          if ( error.errors.hasOwnProperty("email") ) { $scope.errors.emailNotFoundReset = "We can not find the email"; }  
      });
     /* var resetPasswordUser.resetPassword(resetPasswordForm.email);
      resetPasswordPromise.then(function(result) {
        if ( result.hasOwnProperty("email") ) { $scope.emailNotFoundReset = "We can not find the email"; }
      });*/
    };

  $scope.changePassword = function(changePassword) {
    $scope.errors = {};
    User.changePassword(changePassword.newPassword, changePassword.confirmPassword, $stateParams.resetToken).
      success(function(data) {
        $scope.login();
        $state.go('home');
        
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
      User.fromState = fromState.name;
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
  
    $scope.showDialogLogin= function() {
     $mdDialog.show({
            controller: 'AuthCtrl',
            templateUrl: 'auth/_login.html',
            hasBackdrop: true,
            clickOutsideToClose: true
          });
  };
	$scope.closeDialog = function() {
    	$mdDialog.hide();
	};
  
}]);