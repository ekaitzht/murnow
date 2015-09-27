angular.module('murnow')
.controller('ReviewCtrl',
  ['$scope', 'scopeProduct','products', '$mdDialog',
function($scope, scopeProduct, products, $mdDialog){

	$scope.addReview = function(){
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

  		products.addReview(scopeProduct.product.id, 
      {review:  
        { 
          body: $scope.body,
          repurchase: repurchaseBoolean,
          stars:  parseFloat($scope.stars )
        }
      }
  		).success(function(response) {
	  		var review = response.review;
	  	
	  		  		
	  		review["votes"] = []; // Adding votes property because when we start we don't have votes properties
	  		
    		scopeProduct.product.reviews.push(review);
    		scopeProduct.hasReviewUser = true;
    		scopeProduct.zero_reviews = false;
    		if( $scope.repurchase === "true"){
	   			var buyers = scopeProduct.product.buyers + 1;
	   			var not_buyers = scopeProduct.product.not_buyers;
	   		} else {
		   		var buyers = scopeProduct.product.buyers;
	   			var not_buyers = scopeProduct.product.not_buyers + 1;
    		}
    		
			scopeProduct.repurchase_again_percent =  (buyers/(buyers + not_buyers))*100;
    			    		
    		scopeProduct.product.product_stars =  (scopeProduct.product.product_stars + review.stars)/2; //CALCULATE WITH CURRENTE ADDED REVIEW
    		
    		$mdDialog.hide();
    			
			var metadata = {
					body: review.body,
					stars: review.stars,
					repurchase: review.repurchase,
					created_at: Math.floor(Date.now() / 1000),
					user_id: review.user_id, 
					product: document.URL,
					review_id: review.id,
					review_date: Math.floor(Date.now() / 1000)
				}
    		
    		window.Intercom('trackEvent','added-review',metadata);
  		}).error(function(error){
	  		
	  		if($scope.repurchase=='' || $scope.stars == '') {
		  		 $scope.errors.reviewDialog = "You didn't complete the form";
	  		}
	  		
	  	
	  		if (error.error == "You need to sign in or sign up before continuing.") {
		         
		          $scope.errors.reviewDialog = "You can't login because your confirmation email has expired, go to your email"
		    } 
      });
	};
	$scope.closeDialog = function() {
    	$mdDialog.hide();
	};
}]);