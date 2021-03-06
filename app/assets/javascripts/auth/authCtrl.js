angular.module('murnow')
.controller('AuthCtrl', [
'$scope',
'$state',
'Auth',
'User',
'$stateParams',
'$cookies',
'Dialog',
'$rootScope',
'Intercom',
'$http',
function($scope, $state, Auth, User, $stateParams, $cookies, Dialog, $rootScope, Intercom, $http){
  $scope.login = function(fromResetToken) {   
  
    $scope.errors = {};
    if( fromResetToken !== true){
	    	$scope.user.remember_me =  true; 
    }
    Auth.login($scope.user).then(function(ev){
		Intercom.boot(ev);
		
		ga('send', 'event', 'MinorAction', 'Login', 'user_id='+$scope.user.id);
		Dialog.hide();
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
    Dialog.alertSentConfirmation();
    User.send_confirmation_instructions(email);
  }


  $scope.resetPassword = function() {
      $scope.errors = {};

      User.forgotPassword($scope.resetPasswordForm.email
      ).success(function(data) {
         $scope.successfulMessage = "Please check your email to change your password.";
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
        $scope.login(true);
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
    
      Auth.register($scope.user).then(function(ev){
	     	Intercom.boot(ev);
	     	fbq('track', 'CompleteRegistration');
		 	ga('send', 'event', 'MinorAction', 'Signup', 'user_id='+$scope.user.id);
		 	
		 	
		 	
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
    
   		Dialog.forgotPassword();
  };

  $scope.goToLoginPrivateDialog = function() {
 
  		Dialog.loginPrivate();
  };
  
  $scope.showDialogLogin= function() {
     	Dialog.login();
   };

  $scope.closeDialog = function() {
    	Dialog.hide();
  };
  
  $scope.closeDialog = function() {
    	Dialog.hide();
  };
  $scope.showRequestInvitationDialog = function() {
	 
		Dialog.requestInvitation();

  };
  
  $scope.facebookRegister = function(){
    $http.get('/api/check_register_token/'+$stateParams.token).success(function(data){
	    
	     document.location.href = '/users/auth/facebook';
	     
	}).error(function(err, statusCode){
	    if ( statusCode == 401) {
		     $scope.invitationUsed = true;
	    }
    });
  }
  
  
  $scope.sendRequestInvitation = function(){
	$http.post('/api/request_invitation/', {request: $scope.requestInvitation} ).success(function(data){
	 	$scope.sentRequest = true;
 			
	}).error(function(err){

	});
  };

  
}]);