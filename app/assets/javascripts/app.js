var app = angular.module('murnow', ['ui.router','templates', 'Devise', 'ui.bootstrap', 'ngMaterial','ngCookies', 'angularFileUpload','infinite-scroll','ngTouch','ngImgCrop','ngAnimate']);

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
          return products.search($stateParams.searchQuery);
        }]
      }
    })
    .state('forgotpassword', {
      url: '/forgotpassword',
      templateUrl: 'auth/_forgotpassword.html',
      controller: 'AuthCtrl'
    })
     .state('profile', {
      url: '/profile',
      templateUrl: 'profile/_profile.html',
      controller: 'Profile'
    })
    .state('edit_profile', {
      url: '/edit_profile',
      onEnter: function(){
	   event.preventDefault();
       event.stopPropagation();
  	  },
      templateUrl: 'profile/_edit_profile.html',
      controller: 'Profile'
    })
    .state('resetpassword', {
      url: '/resetpassword?resetToken',
      templateUrl: 'auth/_resetpassword.html',
      controller: 'AuthCtrl'
    })
    .state('products', {
  		url: '/products/{id}',
  		templateUrl: 'products/_products.html',
  		controller: 'ProductCtrl',
  		resolve: {
	  		product: ['$stateParams', 'products', function($stateParams, products) {
	        	return products.get($stateParams.id);
	        }]
      	},
      	onEnter: function(){
	  		$("md-content").scrollTop(0);	
  		}
	});

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

}]);

app.run(['$rootScope','$location', '$mdDialog','$state','$anchorScroll',function($rootScope,$location, $mdDialog, $state, $anchorScroll) {
  var lock = false;
  
  if ($location.path() == "/users/sign_in") {
    $rootScope.deregistration_login_after_confirmation = $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
        $mdDialog.show({
            controller: 'AuthCtrl',
            templateUrl: 'auth/_login.html',
            hasBackdrop: true,
            clickOutsideToClose: true
          });
        $rootScope.deregistration_login_after_confirmation();
        delete $rootScope.deregistration_login_after_confirmation;
    });
    
    

  }

   $rootScope.$on('$stateChangeSuccess', function(event, toState,   toParams , fromState, fromParams){    
	    $("#search-box-input").blur();
	    
		switch(toState.name) {
		    case 'home':
		        $rootScope.isHomePage = true;
		        break;
		    default:
		        $rootScope.isHomePage = false;
		}										 
   });
   
    $rootScope.getCurrentNameState = function() {
        return $state.current.name;
    };

}]);
