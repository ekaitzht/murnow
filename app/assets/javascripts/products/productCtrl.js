angular.module('murnow')
.controller('ProductCtrl',
  ['$scope','$rootScope', '$mdDialog','products', 'product', 'Auth','$state','configMurnow', '$stateParams',
function($scope,$rootScope, $mdDialog, products, product, Auth, $state,configMurnow, $stateParams){
  	$scope.Math = window.Math;
  	$scope.product = product.product;
    $scope.cdn = configMurnow.cdn_domain_name;
  	$scope.enviroment = configMurnow.enviroment;
    $rootScope.pageTitle = "Reviews for " + $scope.product.product_name;

    
    $scope.id = $stateParams.id;
    
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
  
  
  //angular.element("#meta-stars").attr("content",$scope.product.product_stars);
  //angular.element("#meta-number-reviews").attr("content", $scope.product.number_reviews);
  
  
  var total_buyers = $scope.product.buyers + $scope.product.not_buyers;
  
  if ($scope.product.buyers == 0 && $scope.product.not_buyers == 0) {
    $scope.repurchase_again_percent = 0;
    $scope.zero_reviews = true;
    $scope.inputReviewPlaceholder = "Be the first to review this product!"
  } else {
	$scope.inputReviewPlaceholder = "Let us know what you think!"
    $scope.repurchase_again_percent = ($scope.product.buyers/total_buyers)*100;
  }
  
  $scope.goProfile = function(user_id_clicked){
	 	   $state.go('profile', { id: user_id_clicked});
   }

  $scope.showAddReviewPanel= function() {
    if(Auth._currentUser == null){
    	Dialog.notSignupAddReview();
    } else {
      Dialog.addReview($scope);
    }
  };


  
  $scope.incrementUpvotes = function(review){
		products.upvoteReview(Auth, review.id).success(function(data){
			review.votes.length += 1;
	    }).error(function(err){
		   	Dialog.youAlreadyVotedThisReview();		
	    });
  };
  
}]);