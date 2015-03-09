angular.module('murnow')
.controller('PublicProfileCtrl',
  ['$scope','User','user', '$mdDialog','$state',
function($scope,User, user, $mdDialog, $state){


   User.getSkinProblems(user.id).success(function(data, status, headers, config) {
    $scope.user.skin_problems =  data.skin_problems; 
  });
  
  

  $scope.user = user;
  $scope.reviews = user.reviews;




  $scope.goToProduct = function(product_id){
	  $state.go('products', { id: product_id});
  }
  
  
}]);