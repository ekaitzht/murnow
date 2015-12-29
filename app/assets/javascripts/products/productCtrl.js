angular.module('murnow')
.controller('ProductCtrl',
  ['$scope','$rootScope', 'Dialog','products', 'product', 'Auth','$state','configMurnow', '$stateParams', 'Intercom', 'Reviews',
function( $scope,$rootScope, Dialog, products, product, Auth, $state,configMurnow, $stateParams, Intercom, Reviews){
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
					$scope.review_id_user_that_is_login = review.id;
					
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
  
  if ($scope.product.reviews.length == 0 ) { // This if controls the future products that don't have reviews we have user zero_reviews, etc.
    //$scope.repurchase_again_percent = 0;
    //$scope.zero_reviews = true;
    $scope.inputReviewPlaceholder = "Be the first to review this product!"
  } else if($scope.product.reviews.length > 0 )  {
	$scope.inputReviewPlaceholder = "Review now and let us know what you think!"
   
  }
  
  $scope.repurchase_again_percent = ($scope.product.buyers/total_buyers)*100;
  
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


  $scope.deleteReview= function(review_id) {
  		Dialog.areYouSureToDeleteReview(review_id).then(function(data){
	  		$scope.repurchase_again_percent = parseInt(data.new_repurchase_percent);
	  		$scope.product.stars = data.new_stars;
	  		
	  		// Removing review from the view.
			for (var i = 0; i < $scope.product.reviews.length; i++) {
			    if($scope.product.reviews[i].id == review_id){
				    $scope.product.reviews.splice(i, 2)
			    }
			}	
			
			$scope.hasReviewUser = false;  		
			
  		}).catch(function(){
	  		
  		});
  };
  
  $scope.editReview= function(review) {
  	Dialog.editReviewDialog(review,$scope);
  };
  
  
  $scope.incrementUpvotes = function(review){
	  	
		products.upvoteReview(Auth, review.id).success(function(data){
			review.votes.length += 1;
			Intercom.likeReview(review, Auth._currentUser.id);
	    }).error(function(err){
		   	Dialog.youAlreadyVotedThisReview();		
	    });
  };
  
}]);