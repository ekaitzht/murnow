angular.module('murnow')
.controller('ReviewCtrl',
  ['$scope', 'scopeProduct','products', '$mdDialog',
function($scope, scopeProduct, products, $mdDialog){

	$scope.addReview = function(){

		if($scope.body === '') { return; }
  		
  		products.addReview(scopeProduct.product.id, 
      {review:  
        { 
          body: $scope.body,
          repurchase: $scope.repurchase,
          stars: $scope.stars 
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
    			    		
    		scopeProduct.product.product_stars =  (scopeProduct.product.product_stars + $scope.stars)/2; //CALCULATE WITH CURRENTE ADDED REVIEW
    		
    		$mdDialog.hide();
  		}).error(function(error){


      });
  		$scope.body = '';
	};

}]);