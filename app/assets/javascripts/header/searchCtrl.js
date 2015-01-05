angular.module('murnow')
.controller('SearchCtrl', ['$scope','$state', function($scope, $state){
 

 $scope.searchProducts = function(){
 	var searchQuery = $scope.searchFilter.searchQuery;
 	$state.go('list_products', { searchQuery: searchQuery});
 };

}]);