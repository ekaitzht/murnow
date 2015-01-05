angular.module('murnow')
.controller('ListProducts', ['$scope','$state','$stateParams','$mdDialog','products',
function($scope,$state,$stateParams, $mdDialog, products){
	
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