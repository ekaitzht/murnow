angular.module('murnow')
.controller('PublicProfileCtrl',
  ['$scope','User','user', '$mdDialog',
function($scope,User, user, $mdDialog){


   User.getSkinProblems(user.user.id).success(function(data, status, headers, config) {
    $scope.user.skin_problems =  data.skin_problems; 
  });

  $scope.user = user.user;


}]);