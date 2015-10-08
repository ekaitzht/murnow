angular.module('murnow')
.controller('DialogCtrl', 
[
'$scope',
'$state',
'Dialog',
function($scope, $state, $Dialog){
	
	$scope.closeDialog = function() {
    	Dialog.hide();
	};
	

	
}]);