angular.module('murnow')
.controller('EditReviewCtrl',
  ['$scope', 'scopeReview','products', 'Dialog','Intercom', 'Reviews',
function($scope, scopeReview, products, Dialog, Intercom, Reviews){
	
	var review_id = scopeReview.id;
	$scope.body = scopeReview.body;
	$scope.stars = scopeReview.stars;
	$scope.repurchase = scopeReview.repurchase.toString();
	
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
	

}]);