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
    .state('products', {
  		url: '/products/{id}',
  		templateUrl: 'products/_products.html',
  		controller: 'ProductsCtrl'
	});

  	$urlRouterProvider.otherwise('home');
}]);



