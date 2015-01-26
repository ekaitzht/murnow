angular.module('murnow')
.controller('ProductCtrl',
  ['$scope', '$mdDialog','products', 'product', 'Auth',
function($scope, $mdDialog, products, product, Auth){
  $scope.Math = window.Math;
  $scope.product = product;
  
  
  
  this.hasReviewUser = function(reviews){
	   var hasReview = false;
	   angular.forEach(reviews, function(review, key) {
		    if (review.user_id == Auth._currentUser.id) { 
				hasReview = true;
							}
		});
		return hasReview;
  }
  $scope.hasReviewUser = this.hasReviewUser($scope.product.reviews);
	


  var total_buyers = product.buyers + product.not_buyers;
  if (product.buyers == 0 && product.not_buyers == 0) {
    $scope.repurchase_again_percent = 0;
  } else {
    $scope.repurchase_again_percent = (product.buyers/total_buyers)*100;
  }
  

  $scope.showAddReviewPanel= function() {
    if(Auth._currentUser == null){
      $mdDialog.show(
          $mdDialog.alert()
            .title('')
            .content('You need to sign up to add reviews!')
            .ariaLabel('')
            .ok('Got it!')
        );
    } else {
        
      $mdDialog.show({
        controller: 'ReviewCtrl',
        templateUrl: 'products/_add_review_dialog.html',
        hasBackdrop: true,
        clickOutsideToClose: true,
        bindToController: true,
        locals: {scopeProduct: $scope}
      });
      
    }
     
  };


  $scope.incrementUpvotes = function(review_id, $index){
    products.upvoteReview(Auth._currentUser.id, review_id).success(function(data){
      $scope.product.reviews[$index].votes.length += 1;
    }).error(function(err){
      $scope.showTooltip[$index] = true;
    });


   
    
   
  };

}]);