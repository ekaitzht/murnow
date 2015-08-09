angular.module('reviewCard',[])
.directive('reviewCard', ['$state', function( $state){
	return {
		restrict: 'E',
		scope: {
			review: '='
			
		},
		replace:true,
		templateUrl:'directives/_reviewCard.html',
		
		controller:['$scope',function($scope){
			$scope.goProfile = function(user_id_clicked){
				$state.go('profile', { id: user_id_clicked});
   			}
   			
   			$scope.goToProduct = function(product_id){
				$state.go('products', { id: product_id});
   			}
		}]
	};
}]);




