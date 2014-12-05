angular.module('flapperNews', ['ui.router','templates'])
.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {  // CAMBIAR ESTOOOOOOO
      url: '/home',
      templateUrl: 'home/_home.html',
      controller: 'MainCtrl',
      resolve: {
        productsPromise: ['products', function(products){
          return products.getAll();
        }]
      }
    })
    .state('products', {
  		url: '/products/{id}',
  		templateUrl: 'products/_products.html',
  		controller: 'ProductsCtrl',
      resolve: {
      product: ['$stateParams', 'products', function($stateParams, products) {
          return products.get($stateParams.id);
        }]
      }
	});

  	$urlRouterProvider.otherwise('home');
}]);



