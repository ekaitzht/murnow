angular.module('murnow')
.controller('ListProducts', ['$scope','$state','$stateParams','$mdDialog','products',
function($scope,$state,$stateParams, $mdDialog, products){
	$scope.from = 0;
	$scope.products = products.products.search;
    $scope.paginator = {busy: false, ended: false};

	if($scope.products.length === 0 ) { 
		$scope.paginator.ended = true;
	} else {
		$scope.paginator.ended = false;

	}
	
	
	$scope.ProductsFactory = products;


    
	$scope.addProduct = function(){
  		$scope.reviews.push({title: $scope.title, upvotes: 0});
		$scope.title = '';
	};
	
	
	$scope.paginator.nextPage = function(){
	
	  if( !$scope.paginator.ended ){
		$scope.paginator.busy = true;
		$scope.ProductsFactory.searchNextPage().success(function(response){
		  $scope.paginator.busy = false;
		  
		  if(response.search.length ===  0) {
			$scope.paginator.ended = true;
		  }
		  
		  $.merge($scope.products, response.search);
		  
	  	});
	  }
 	} 



	$scope.incrementUpvotes = function(review){
		review.upvotes += 1;
	}
	$scope.decrementUpvotes = function(review){
		review.upvotes -= 1;
	}

}]);