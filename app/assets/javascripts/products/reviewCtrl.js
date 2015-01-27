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
	  		var product = response.product;
	  		
    		scopeProduct.product.reviews.push(review);
    		scopeProduct.hasReviewUser = true;
    		scopeProduct.repurchase_again_percent =  (product.buyers/(product.buyers + product.not_buyers))*100;
    		scopeProduct.product.product_stars = product.product_stars;
    		
    		$mdDialog.hide();
  		}).error(function(error){


      });
  		$scope.body = '';
	};

}]);