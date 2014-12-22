angular.module('flapperNews')
.controller('NavCtrl', [
'$scope',
'Auth',
'$mdDialog',
function($scope, Auth, $mdDialog){
  $scope.signedIn = Auth.isAuthenticated;
  $scope.logout = Auth.logout;

   Auth.currentUser().then(function (user){
    $scope.user = user;
  });

  $scope.$on('devise:new-registration', function (e, user){
    $scope.user = user;
  });

  $scope.$on('devise:login', function (e, user){
    $scope.user = user;
    $mdDialog.hide();
  });

  $scope.$on('devise:logout', function (e, user){
    $scope.user = {};
  });

  $scope.showDialogLogin = function() {
  
     $mdDialog.show({
            controller: 'AuthCtrl',
            templateUrl: 'auth/_login.html',
            hasBackdrop: true,
            clickOutsideToClose: true
          });
  };

}]);