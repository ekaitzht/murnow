angular.module('murnow')
.controller('FollowingCtrl', ['$scope', 'followingUsers','configMurnow',
function($scope, followingUsers, configMurnow) {

	$scope.users = followingUsers.data.users;
    $scope.cdn = configMurnow.cdn_domain_name;
  	$scope.enviroment = configMurnow.enviroment;



  	function chunk(arr, size) {
	  var newArr = [];
	  for (var i=0; i<arr.length; i+=size) {
	    newArr.push(arr.slice(i, i+size));
	  }
	  return newArr;
	}

	$scope.chunkedData = chunk($scope.users, 4);


}]);


