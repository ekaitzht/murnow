angular.module('murnow')
.controller('ProductCtrl',
  ['$scope', '$mdDialog','products', 'product', 'Auth','$state','configMurnow',
function($scope, $mdDialog, products, product, Auth, $state,configMurnow){
  $scope.Math = window.Math;
  $scope.product = product.product;
  $scope.cdn = configMurnow.cdn_domain_name;
  $scope.enviroment = configMurnow.enviroment;
  
  	this.hasReviewUser = function(reviews){
	    $scope.hasReviewUser = false;
	  
	    Auth.currentUser().then(function (user){
		    angular.forEach(reviews, function(review, key) {
				if (review.user_id == user.id) { 
					$scope.hasReviewUser = true;
				}
			});
		}, function(error) {
			// unauthenticated error
			$scope.hasReviewUser = false;
        });
	};
        
	
  this.hasReviewUser($scope.product.reviews);

  var total_buyers = $scope.product.buyers + $scope.product.not_buyers;
  
  if ($scope.product.buyers == 0 && $scope.product.not_buyers == 0) {
    $scope.repurchase_again_percent = 0;
    $scope.zero_reviews = true;
    $scope.inputReviewPlaceholder = "We don't have reviews for now click here to be the first to add a review"
  } else {
	$scope.inputReviewPlaceholder = "Click here to add a review."
    $scope.repurchase_again_percent = ($scope.product.buyers/total_buyers)*100;
  }
  
  $scope.goProfile = function(user_id_clicked){
	 	   $state.go('profile', { id: user_id_clicked});
   }

  $scope.showAddReviewPanel= function() {
    if(Auth._currentUser == null){
      $mdDialog.show(
          $mdDialog.alert()
            .title('')
            .content('You need to sign up to add reviews!')
            .ariaLabel('')
            .ok('Got it!')
        );
    } else {
        
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
     
  };

  $scope.incrementUpvotes = function(review_id, $index){
	  
	if(Auth._currentUser === null){
		 $mdDialog.show(
          $mdDialog.alert()
            .title('')
            .content('You need to sign up to vote a comment!')
            .ariaLabel('')
            .ok('Got it!')
        );

	} else {
		products.upvoteReview(Auth._currentUser.id, review_id).success(function(data){
	      $scope.product.reviews[$index].votes.length += 1;
	    }).error(function(err){
		    $mdDialog.show(
	          $mdDialog.alert()
	            .title('')
	            .content('You have already voted this review!')
	            .ariaLabel('')
	            .ok('Got it!')
	        );
	    });
	}
	
	



   
    
   
  };

}]);