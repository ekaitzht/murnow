angular.module('murnow')
.controller('EditReviewCtrl',
  ['$scope', 'scopeProduct', 'review', 'products', 'Dialog','Intercom', 'Reviews',
function($scope, scopeProduct, review, products, Dialog, Intercom, Reviews){
	
	var review_id = review.id;
	$scope.body = review.body;
	$scope.stars = review.stars;
	$scope.repurchase = review.repurchase.toString();
	$scope.review_id

	$scope.editReview = function(){
		$scope.errors = {};
		
		if($scope.body === '') { return; }
		if($scope.repurchase === undefined){
			$scope.repurchase = '';

  		} else if ( $scope.repurchase === 'true') {
  			var repurchaseBoolean = true;

  		} else if( $scope.repurchase === 'false') {
  			var repurchaseBoolean = false;	
  		}
  		if($scope.stars === undefined){$scope.stars = '';}
  		
  		if($scope.repurchase !== "" && $scope.body !== undefined ){
	  		Reviews.editReview(
			      {review:  
			        { 
			          body: $scope.body,
			          repurchase: repurchaseBoolean,
			          stars:  parseFloat($scope.stars ),
			          id: review_id
			        }
			      }
	  		).success(function(response) {

				scopeProduct.repurchase_again_percent =  response.new_repurchase_percent;
	    		scopeProduct.product.product_stars = response.new_stars;
	    		scopeProduct.product.reviews[review.index_review].stars = $scope.stars;
	    		scopeProduct.product.reviews[review.index_review].body = $scope.body;
	    		scopeProduct.product.reviews[review.index_review].repurchase = $scope.repurchase;
	    		Dialog.hide();
	    			
				//Intercom.addReview(review)
	  		}).error(function(error){
		  		
		  		if( $scope.stars == '') {
			  		 $scope.errors.reviewDialog = "You didn't fill the stars for this product.";
		  		}
		  		
		  	
		  		if (error.error == "You need to sign in or sign up before continuing.") {
			         
			          $scope.errors.reviewDialog = "You can't login because your confirmation email has expired, go to your email"
			    } 
	      	});
	    } else {
			$scope.errors.reviewDialog = "You didn't complete all fields";
		
	    }
	      
      
      
	};
	
	$scope.closeDialog = function() {
    	Dialog.hide();
	};
	
	$scope.deleteReview= function() {
  		Dialog.areYouSureToDeleteReview(review_id).then(function(data){
	  		scopeProduct.repurchase_again_percent = parseInt(data.new_repurchase_percent);
	  		scopeProduct.product.stars = data.new_stars;
	  		
	  		// Removing review from the view.
			for (var i = 0; i < scopeProduct.product.reviews.length; i++) {
			    if(scopeProduct.product.reviews[i].id == review_id){
				    scopeProduct.product.reviews.splice(i, 1)
			    }
			}	
			
			scopeProduct.hasReviewUser = false;  		
			
  		}).catch(function(){
	  		
  		});
  	};

}]);