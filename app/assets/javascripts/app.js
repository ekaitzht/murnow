angular.module('flapperNews', ['ui.router','templates', 'Devise'])
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
    .state('login', {
      url: '/login',
      templateUrl: 'auth/_login.html',
      controller: 'AuthCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'auth/_register.html',
      controller: 'AuthCtrl'
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



