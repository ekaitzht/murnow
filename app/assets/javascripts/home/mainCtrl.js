angular.module('flapperNews')
.controller('MainCtrl', ['$scope','products',function($scope,products){
	
	$scope.products = products.products;

	$scope.products.push({
	  title: 'Sephora kis kiss',
	  upvotes: 0,
	  reviews: [
	    {author: 'Joe', body: 'Cool post!', upvotes: 0},
	    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
	  ]
	});

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