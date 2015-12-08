angular.module('murnow')
.controller('FollowingCtrl', ['$scope', 'followingUsers','configMurnow',
function($scope, followingUsers, configMurnow) {

	$scope.users = followingUsers.data.users;
    $scope.cdn = configMurnow.cdn_domain_name;
  	$scope.enviroment = configMurnow.enviroment;

}]);


