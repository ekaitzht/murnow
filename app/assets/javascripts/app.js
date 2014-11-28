angular.module('flapperNews', ['ui.router','templates'])
.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {  // CAMBIAR ESTOOOOOOO
      url: '/home',
      templateUrl: 'home/_home.html',
      controller: 'MainCtrl'
    })
    .state('product', {
  		url: 'posts/_posts.html',
  		templateUrl: '/products.html',
  		controller: 'ProductsCtrl'
	});

  	$urlRouterProvider.otherwise('home');
}])
.controller('MainCtrl', ['$scope','products',function($scope,products){
	
	$scope.products = products.products;

	$scope.products.push({
	  title: 'Sephora kis kiss',
	  upvotes: 0,
	  reviews: [
	    {author: 'Joe', body: 'Cool post!', upvotes: 0},
	    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
	  ]
	});

	$scope.addProduct = function(){
  		$scope.reviews.push({title: $scope.title, upvotes: 0});
		$scope.title = '';
	};


	$scope.incrementUpvotes = function(review){
		review.upvotes += 1;
	}
	$scope.decrementUpvotes = function(review){
		review.upvotes -= 1;
	}

}])
.factory('products', [function(){
    var o = {
    products: []
  };
  return o;
}])
.controller('ProductsCtrl', ['$scope','$stateParams', 'products', function($scope, $stateParams, products){



	$scope.product = products.products[$stateParams.id];

	$scope.addReview = function(){

	  if($scope.body === '') { return; }

	  $scope.product.reviews.push({
	    body: $scope.body,
	    author: 'user',
	    upvotes: 0
	  });

	  $scope.body = '';
	};

}]);
