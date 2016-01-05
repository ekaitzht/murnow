angular.module('reviewCard',[])
.directive('reviewCard', ['$state','Dialog','Vote', function( $state, Dialog, Vote){
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
   			
   			
   			$scope.incrementUpvotes = function(review){
 				Vote.incrementUpvotes(review).then(function(data){
					if (data == false){
						review.votes -= 1;
					} else if (data === true){
						review.votes += 1;
					}
				}).catch(function(err){
					
				});
		 		 
  			};
		}]
	};
}]);




