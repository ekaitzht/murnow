angular.module('murnow')
.controller('NavCtrl', [
'$scope',
'$state',
'Auth',
'Dialog',
'User',
'configMurnow',
'Intercom',
function($scope,$state, Auth, Dialog, User, configMurnow,Intercom){
  $scope.signedIn = Auth.isAuthenticated;
  $scope.logout = Auth.logout;
  $scope.cdn = configMurnow.cdn_domain_name;
  $scope.enviroment = configMurnow.enviroment;
//.not-home-page .mainNav {display: inline-block !important;float: right !important;}

   Auth.currentUser().then(function (user){
	  Intercom.boot(User.getUser()); 
      $scope.user = User.getUser();
  });

  $scope.$on('devise:new-registration', function (e, user){
	Intercom.boot(user);	 
    $scope.user = user;
    User.setUser(user);
    Dialog.hide();
    $('#cupcake-backdrop').hide();
	$('.block-page').show();
    		
  });

  $scope.$on('devise:login', function (e, user){
    $scope.user = user;
    User.setUser(user);
    Intercom.boot(user); 
    Dialog.hide();
    $('#cupcake-backdrop').hide();
   	$('.block-page').show();



  });

  $scope.$on('devise:logout', function (e, user){
    $scope.user = {};
	Intercom.shutdown();
	$state.go('home',{}, {reload: true});
	$('#cupcake-backdrop').show();
	$('.block-page').hide();

		

  });

  $scope.showDialogRegisterOptions= function() {
  
     Dialog.signupOptions();
  };

  $scope.showDialogLogin= function() {
    	 Dialog.login();
  };

  $scope.showDialogRegister = function() {
   
     	Dialog.register();
  };
  
  $scope.goToProfile = function(profile_id){
	  $state.go('profile', { id: profile_id});
  }
  	
  


}]);