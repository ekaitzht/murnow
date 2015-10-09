angular.module('murnow')
.controller('TrendingListProductsCtrl', ['$scope','$rootScope','$state','$stateParams','products','configMurnow',
function($scope, $rootScope, $state,$stateParams, products,configMurnow){
	$scope.products = products.products.search;
    $scope.cdn = configMurnow.cdn_domain_name;
    
	$rootScope.pageTitle = "Results for " + products.searchQuery;

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
	


}]);