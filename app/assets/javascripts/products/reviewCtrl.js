angular.module('murnow')
.controller('ReviewCtrl',
  ['$scope', 'scopeProduct','products', '$mdDialog',
function($scope, scopeProduct, products, $mdDialog){

	$scope.addReview = function(){

		if($scope.body === '') { return; }
  		
  		products.addReview(scopeProduct.product.id, 
   			{ body: $scope.body, repurchase: $scope.repurchase, stars: $scope.stars }
  		).success(function(review) {
    		scopeProduct.product.reviews.push(review);
    		$mdDialog.hide();
  		}).error(function(error){


      });
  		$scope.body = '';
	};

}]);