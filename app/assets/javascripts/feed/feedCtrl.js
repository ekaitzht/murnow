angular.module('murnow')
.controller('FeedCtrl', ['$scope', 'reviewsFeed','configMurnow',
function($scope, reviewsFeed, configMurnow) {

	$scope.reviews = reviewsFeed.data.users;
    $scope.cdn = configMurnow.cdn_domain_name;
  	$scope.enviroment = configMurnow.enviroment;
  	
  	
  	$scope.hello ="hello";



}]);
