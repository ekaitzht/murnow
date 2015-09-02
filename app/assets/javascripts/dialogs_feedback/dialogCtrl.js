angular.module('murnow')
.controller('DialogCtrl', 
[
'$scope',
'$state',
'$mdDialog',
function($scope, $state, $mdDialog){

	 $scope.showDialogRegister= function() {
  
     $mdDialog.show({
            controller: 'AuthCtrl',
            templateUrl: 'auth/_register.html',
            hasBackdrop: true,
            clickOutsideToClose: true
          });
  	};
	
	$scope.closeDialog = function() {
    	$mdDialog.hide();
	};
	
}]);