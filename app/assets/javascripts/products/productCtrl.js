angular.module('murnow')
.controller('ProductCtrl',
  ['$scope', '$mdDialog','products', 'product',
function($scope, $mdDialog, products, product){
  $scope.Math = window.Math;
	$scope.product = product;

  var total_buyers = product.buyers + product.not_buyers;
  if (product.buyers == 0 && product.not_buyers == 0) {
    $scope.repurchase_again_percent = 0;
  } else {
    $scope.repurchase_again_percent = (product.buyers/total_buyers)*100;
  }
  

  $scope.showAddReviewPanel= function() {
  
     $mdDialog.show({
            controller: 'ReviewCtrl',
            templateUrl: 'products/_add_review_dialog.html',
            hasBackdrop: true,
            clickOutsideToClose: true,
            bindToController: true,
            locals: {scopeProduct: $scope}
          });
  };


  $scope.incrementUpvotes = function(review){
    products.upvoteReview(product, review);
  };



}]);