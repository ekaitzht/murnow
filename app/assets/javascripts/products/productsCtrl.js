angular.module('flapperNews')
.controller('ProductsCtrl', ['$scope','$stateParams', 'products', function($scope, $stateParams, products){



	$scope.product = products.products[$stateParams.id];

	$scope.addReview = function(){

	  if($scope.body === '') { return; }

	  $scope.product.reviews.push({
	    body: $scope.body,
	    author: 'user',
	    upvotes: 0
	  });

	  $scope.body = '';
	};

}]);