angular.module('murnow')
.controller('ProductsCtrl', ['$scope','products', 'product', function($scope, products, product){



	$scope.product = product;

	$scope.addReview = function(){

		if($scope.body === '') { return; }
  		
  		products.addReview(product.id, 
   			{ body: $scope.body }
  		).success(function(review) {
    		$scope.product.reviews.push(review);
  		}).error(function(error){


      });
  		$scope.body = '';
	};

  $scope.incrementUpvotes = function(review){
    products.upvoteReview(product, review);
  };

}]);