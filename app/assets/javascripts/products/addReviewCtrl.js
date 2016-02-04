angular.module('murnow')
.controller('AddReviewCtrl',
  ['$scope', 'scopeProduct','products', 'Dialog','Intercom',
function($scope, scopeProduct, products, Dialog, Intercom){
		$scope.repurchaseError = false;
		$scope.errors = {};
		$scope.sendButtonDisabled = false;
		$scope.sendButtonName = "Send Review";
		
		
		$scope.addReview = function(){
			
			$scope.sendButtonName = "Sending...";
			$scope.sendButtonDisabled = true;
		
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
			  		fbq('track', 'AddToWishlist');
			  		ga('send', 'event', 'MayorAction', 'AddReview', 'User gives review to a product');
			  		
			  		review["votes"] = []; // Adding votes property because when we start we don't have votes properties
			  		
		    		scopeProduct.product.reviews.push(review);
		    		scopeProduct.hasReviewUser = true;
		    		scopeProduct.zero_reviews = false;
		    		scopeProduct.review_id_user_that_is_login = review.id;
		    		
		    		
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
		    			
					Intercom.addReview(review)
				    $scope.sendButtonDisabled = false;
	
		  		}).error(function(error){
			  		$scope.sendButtonDisabled = false;
			  		$scope.sendButtonName = "Send Review";
			  		if( $scope.stars == '') {
				  		 $scope.errors.reviewDialog = "You didn't fill the stars for this product.";
			  		}
			  		
			  	
			  		if (error.error == "You need to sign in or sign up before continuing.") {
				         
				          $scope.errors.reviewDialog = "You can't login because your confirmation email has expired, go to your email"
				    } 
		      	});
	    } else {
		    $scope.sendButtonDisabled = false;
			$scope.sendButtonName = "Send Review";
			$scope.errors.reviewDialog = "You didn't complete all fields";
		
	    }
	      
      
      
	};
	
	
	$scope.closeDialog = function() {
    	Dialog.hide();
	};
	

}]);