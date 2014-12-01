angular.module('flapperNews')
.controller('MainCtrl', ['$scope','products',function($scope,products){
	
	$scope.products = products.products;

	$scope.addProduct = function(){
  		$scope.reviews.push({title: $scope.title, upvotes: 0});
		$scope.title = '';
	};


	$scope.incrementUpvotes = function(review){
		review.upvotes += 1;
	}
	$scope.decrementUpvotes = function(review){
		review.upvotes -= 1;
	}

}]);