angular.module('murnow')
.factory('Dialog',['$mdDialog', function($mdDialog){
    
    this.register = function() {
	    
	    $mdDialog.show({
            controller: 'AuthCtrl',
            templateUrl: 'auth/_register.html',
            hasBackdrop: false
        });
	 
	};
	
	this.notSignupAddReview = function(){
		
	    $mdDialog.show({
			controller: 'DialogCtrl', 
        	templateUrl: 'dialogs_feedback/_not_signup_add_review.html',
        	hasBackdrop: true,
        	clickOutsideToClose: true
        });
	}
	
	
	this.forgotPassword = function(){
		$mdDialog.show({
            controller: 'AuthCtrl',
            templateUrl: 'auth/_forgotpassword.html',
            hasBackdrop: false
        });
	}


	this.resetPassword = function(){
		$mdDialog.show({
            controller: 'AuthCtrl',
            templateUrl: 'auth/_resetpassword.html',
            hasBackdrop: false
        });
	}

	this.signupOptions = function(){
		$mdDialog.show({
            controller: 'AuthCtrl',
            templateUrl: 'auth/_panel_signup_options.html',
            hasBackdrop: true,
            clickOutsideToClose: true
        });
	}
	
	this.login = function(){
		$mdDialog.show({
            controller: 'AuthCtrl',
            templateUrl: 'auth/_login.html',
            hasBackdrop: true,
            clickOutsideToClose: true
        });
	}
	
    this.loginPrivate = function(){
		$mdDialog.show({
            controller: 'AuthCtrl',
            templateUrl: 'auth/_login_private.html',
            hasBackdrop: false
        });
	}
	
	this.requestInvitation = function(){
		$mdDialog.show({
            controller: 'AuthCtrl',
            templateUrl: 'auth/_request_invitation.html',
            hasBackdrop: false
        });
	}

	this.alertSentConfirmation = function() {
		$mdDialog.show(
	      $mdDialog.alert()
	        .title('Email sent!')
	        .content('We have sent you the confirmation instructions to your email address.')
	        .ariaLabel('Password notification')
	        .ok('Got it!')
	    );
	}


	this.youAlreadyVotedThisReview = function(){
		$mdDialog.show(
          $mdDialog.alert()
            .title('')
            .content('You have already voted for this review.')
            .ariaLabel('')
            .ok('Got it!')
        );
	}
	
	this.requestProduct = function(){
		$mdDialog.show({
	        controller: 'RequestProductCtrl',
	        templateUrl: 'list_products/_request_product_dialog.html',
	        hasBackdrop: true
		});
	}
	
	this.notSignUpUpvoteReview = function(){
		$mdDialog.show({
			 controller: 'DialogCtrl', 
        	templateUrl: 'dialogs_feedback/_not_signup.html',
        	hasBackdrop: true,
        	clickOutsideToClose: true
        });		
	}
	
	this.addReview = function($scope){
		$mdDialog.show({
	        controller: 'ReviewCtrl',
	        templateUrl: 'products/_add_review_dialog.html',
	        hasBackdrop: true,
	        clickOutsideToClose: true,
	        bindToController: true,
	        onComplete:function(){
	           
	           $('#body-text-review').focus();
	        },
	        locals: {scopeProduct: $scope}
      	});
	}



	this.photoTooBig = function($scope){
		$mdDialog.show(
          $mdDialog.alert()
            .title('Photo too big')
            .content('The size of the image chosen is too big. Please upload a file with less than 2MB.')
            .ariaLabel('Password notification')
            .ok('Got it!')
        );
	}
	
	this.cropImage = function(evt,scope) {
		$mdDialog.show({
            controller: 'CropImageCtrl',
            templateUrl: 'profile/_dialogCropImage.html',
            hasBackdrop: true,
            clickOutsideToClose: false,
            locals: {myImage: evt.target.result, scopeEditProfile: scope}
        });
	}
	
	this.hide = function(){
		$mdDialog.hide();
	}
				

	return this;
}]);



