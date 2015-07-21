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

   Auth.currentUser().then(function (user){
    $scope.user = user;
  });

  $scope.$on('devise:new-registration', function (e, user){
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