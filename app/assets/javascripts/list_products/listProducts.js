angular.module('murnow')
.controller('ListProducts', ['$scope','$rootScope','$state','$stateParams','$mdDialog','products','configMurnow',
function($scope, $rootScope, $state,$stateParams, $mdDialog, products,configMurnow){
	$scope.from = 0;
	$scope.products = products.products.search;
    $scope.paginator = {busy: false, ended: false};
    $scope.cdn = configMurnow.cdn_domain_name;
    
	$rootScope.pageTitle = "Results for " + products.searchQuery ;

	if($scope.products.length === 0 ) { 
		$scope.paginator.ended = true;
	} else {
		$scope.paginator.ended = false;

	}
	
	$scope.percentFilter = function(product) {
		return  (product.buyers/(product.buyers + product.not_buyers))*100;
	};
	
	
	$scope.ProductsFactory = products;
    
	$scope.addProduct = function(){
  		$scope.reviews.push({title: $scope.title, upvotes: 0});
		$scope.title = '';
	};
	
	$scope.goToProductState = function (state, id){
		$state.go(state, {id: id});
	}
	
	
	$scope.paginator.nextPage = function(){
	
	  if( !$scope.paginator.ended ){
		$scope.paginator.busy = true;
		$scope.ProductsFactory.searchNextPage().success(function(response){
		  $scope.paginator.busy = false;
		  
		  if(response.search.length ===  0) {
			$scope.paginator.ended = true;
		  } else{
			$.merge($scope.products, response.search);
			
		  }
		  
		  
		  
	  	});
	  }
 	} 



	$scope.incrementUpvotes = function(review){
		review.upvotes += 1;
	}
	$scope.incrementUpvotes = function(review){
		review.upvotes -= 1;
	}

}]);