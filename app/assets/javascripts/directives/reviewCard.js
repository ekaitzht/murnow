angular.module('reviewCard',[])
.directive('reviewCard', ['$state','$mdDialog', function( $state, $mdDialog){
	return {
		restrict: 'E',
		scope: {
			review: '=',
			index: '='
			
		},
		replace:true,
		templateUrl:'directives/_reviewCard.html',
		
		controller:['$scope','Auth','products',function($scope, Auth, products){
			$scope.goProfile = function(user_id_clicked){
				$state.go('profile', { id: user_id_clicked});
   			}
   			
   			$scope.goToProduct = function(product_id){
				$state.go('products', { id: product_id});
   			}
   			
   			
   			$scope.incrementUpvotes = function(review_id, index){
		 		products.upvoteReview(Auth, review_id, $scope, index).success(function(data){
					$scope.review.votes = parseInt($scope.review.votes) + 1;
					
			    }).error(function(err){
					  $mdDialog.show(
				          $mdDialog.alert()
				            .title('')
				            .content('You have already voted for this review.')
				            .ariaLabel('')
				            .ok('Got it!')
				        );
			    });
		 		
		 		 
  			};
		}]
	};
}]);




