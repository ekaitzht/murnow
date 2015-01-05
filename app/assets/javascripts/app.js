var app = angular.module('murnow', ['ui.router','templates', 'Devise', 'ui.bootstrap', 'ngMaterial','ngCookies']);

app.config([
'$stateProvider',
'$urlRouterProvider',
'$locationProvider',
function($stateProvider, $urlRouterProvider,$locationProvider, $rootScope, $mdDialog) {


  $stateProvider
    .state('home', {  // CAMBIAR ESTOOOOOOO
      url: '/',
      templateUrl: 'home/_background.html',
      controller: 'MainCtrl'
    })
    .state('list_products', {  // CAMBIAR ESTOOOOOOO
      url: '/list_products/:searchQuery',
      templateUrl: 'list_products/_products_list.html',
      controller: 'ListProducts',
      resolve: {
        productsPromise: ['products','$stateParams', function(products, $stateParams){
          return products.getAll($stateParams);
        }]
      }
    })
    .state('forgotpassword', {
      url: '/forgotpassword',
      templateUrl: 'auth/_forgotpassword.html',
      controller: 'AuthCtrl'
    })
    .state('resetpassword', {
      url: '/resetpassword?resetToken',
      templateUrl: 'auth/_resetpassword.html',
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

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

}]);

app.run(['$rootScope','$location', '$mdDialog',function($rootScope,$location, $mdDialog) {

  if ($location.path() == "/users/sign_in") {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
        $mdDialog.show({
            controller: 'AuthCtrl',
            templateUrl: 'auth/_login.html',
            hasBackdrop: true,
            clickOutsideToClose: true
          });
    })
  }

}]);
