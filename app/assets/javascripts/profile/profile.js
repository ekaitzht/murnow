angular.module('murnow')
.controller('Profile', [
'$scope','User',
function($scope, User){
 $scope.user = User.user_session;
}]);

