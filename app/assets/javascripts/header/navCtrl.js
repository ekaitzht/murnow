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
    /*$('#cupcake-backdrop').hide();
	$('.block-page').show();
	//$('body').removeClass('backdrop-active');
	if ($('body').hasClass('backdrop-active')){
	   	$('body').toggleClass("backdrop-active backdrop-deactivate");
   	}	*/	
  });

  $scope.$on('devise:login', function (e, user){
    $scope.user = user;
    User.setUser(user);
    Intercom.boot(user); 
    Dialog.hide();
    /*$('#cupcake-backdrop').hide();
   	$('.block-page').show();
   	//$('body').removeClass('backdrop-active');
   	if ($('body').hasClass('backdrop-active')){
	   	$('body').toggleClass("backdrop-active backdrop-deactivate");
   	}*/


  });

  $scope.$on('devise:logout', function (e, user){
    $scope.user = {};
	Intercom.shutdown();
	$state.go('home',{}, {reload: true});
	/*$('#cupcake-backdrop').show();
	$('.block-page').hide();
	//$('body').addClass('backdrop-active');
	/*if ($('body').hasClass('backdrop-deactivate')){
		$('body').toggleClass("backdrop-active backdrop-deactivate");
	}*/
		

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
  	
  
  $scope.goToFollowingFeed = function(profile_id){
	  $state.go('feed', { id: profile_id});
  }

}]);