angular.module('murnow')
.controller('NavCtrl', [
'$scope',
'$state',
'Auth',
'$mdDialog',
'User',
'configMurnow',
function($scope,$state, Auth, $mdDialog, User, configMurnow){
  $scope.signedIn = Auth.isAuthenticated;
  $scope.logout = Auth.logout;
  $scope.cdn = configMurnow.cdn_domain_name;
  $scope.enviroment = configMurnow.enviroment;
//.not-home-page .mainNav {display: inline-block !important;float: right !important;}

   Auth.currentUser().then(function (user){
	  	if( location.hostname == 'www.murnow.com' ) {
        window.Intercom('boot',  {
		   app_id: 'ugedhl1s',
		   email: user.email,
		   user_id: user.id,
		   created_at: user.created_at
		 } );
	} else {
		 window.Intercom('boot',  {
		   app_id: 'xjo9xumi',
		   email: user.email,
		   user_id: user.id,
		   created_at: user.created_at
		 });
	}	 
   
   
   
   
    $scope.user = user;
    
    
    
    
  });

  $scope.$on('devise:new-registration', function (e, user){
	  
	  	if( location.hostname == 'www.murnow.com' ) {
        window.Intercom('boot',  {
		   app_id: 'ugedhl1s',
		   email: user.email,
		   user_id: user.id,
		   name: user.username,
		   created_at: user.created_at
		 } );
	} else {
		 window.Intercom('boot',  {
		   app_id: 'xjo9xumi',
		   email: user.email,
		   user_id: user.id,
		   name: user.username,
		   created_at: user.created_at
		 });
	}	 
    $scope.user = user;
     User.setUser(user);
     $mdDialog.hide();
  });

  $scope.$on('devise:login', function (e, user){
    $scope.user = user;
     User.setUser(user);
    $mdDialog.hide();
  });

  $scope.$on('devise:logout', function (e, user){
    $scope.user = {};
    Intercom('shutdown'); 
    $state.go('home');
  });

  $scope.showDialogRegisterOptions= function() {
  
     $mdDialog.show({
            controller: 'AuthCtrl',
            templateUrl: 'auth/_panel_signup_options.html',
            hasBackdrop: true,
            clickOutsideToClose: true
          });
  };

  $scope.showDialogLogin= function() {
     $mdDialog.show({
            controller: 'AuthCtrl',
            templateUrl: 'auth/_login.html',
            hasBackdrop: true,
            clickOutsideToClose: true
          });
  };

  $scope.showDialogRegister = function() {
   
     $mdDialog.show({
            controller: 'AuthCtrl',
            templateUrl: 'auth/_register.html',
            hasBackdrop: true,
            clickOutsideToClose: true
          });
  };
  
  $scope.goToProfile = function(profile_id){
	  $state.go('profile', { id: profile_id});
  	}
  	
  


}]);