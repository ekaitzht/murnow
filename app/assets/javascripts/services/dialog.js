angular.module('murnow')
.factory('Dialog',['$mdDialog','Reviews', '$q', function($mdDialog, Reviews, $q){
    
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
	        .textContent('We have sent you the confirmation instructions to your email address.')
	        .ariaLabel('Password notification')
	        .ok('Got it!')
	    );
	}


	this.youAlreadyVotedThisReview = function(){
		$mdDialog.show(
          $mdDialog.alert()
            .title('')
            .textContent('You have already voted for this review.')
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
	        controller: 'AddReviewCtrl',
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
            .textContent('The size of the image chosen is too big. Please upload a file with less than 2MB.')
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
	
	
	this.areYouSureToDeleteReview = function(review_id){
		
		var q = $q.defer();
		var confirm = $mdDialog.confirm()
          .title('Are you sure that you want to do that action?')
          .textContent('This action is no possible to revert')
          .ariaLabel('Confirm action')
          .ok('Please do it!')
          .cancel('No!!');
          
	    $mdDialog.show(confirm).then(function() {
		    Reviews.deleteReview(review_id).success(function(data){
			    q.resolve(data);
		    }).error(function(err){
			    q.reject(err);
		    });
	    
		    
	    }, function() {
		       console.log("Cancel dialog.")
	    });
	    
	    return q.promise;
	}
	

      
      
	this.editReviewDialog = function(review, $scope) {
	    
		$mdDialog.show({
	        controller: 'EditReviewCtrl',
	        templateUrl: 'products/_edit_review_dialog.html',
	        hasBackdrop: true,
	        clickOutsideToClose: true,
	        bindToController: true,
	        onComplete:function(){
	           
	           $('#body-text-review').focus();
	        },
	        locals: {scopeProduct: $scope, review:review}
      	});
	 
	};
		
				
 
	return this;
}]);



