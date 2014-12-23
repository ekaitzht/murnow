angular.module('flapperNews')
.controller('MainCtrl', ['$scope','$stateParams','$mdDialog','products',function($scope,$stateParams, $mdDialog, products){
	
	$scope.products = products.products;

	if ($stateParams.confirmation == "1") {
		   $mdDialog.show({
            controller: 'AuthCtrl',
            templateUrl: 'auth/_login.html',
            hasBackdrop: true,
            clickOutsideToClose: true
          });
	}

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