angular.module('murnow')
.controller('FeedCtrl', ['$scope', 'reviewsFeed','configMurnow', '$state',
function($scope, reviewsFeed, configMurnow, $state) {

	$scope.reviews = reviewsFeed.data.users;
    $scope.cdn = configMurnow.cdn_domain_name;
  	$scope.enviroment = configMurnow.enviroment;
  	
  	
  	$scope.hello ="hello";

    $scope.goToProduct = function(product_id) {
        $state.go('products', {
            id: product_id
        });
    }

}]);
