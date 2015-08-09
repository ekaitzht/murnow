angular.module('murnow')
.controller('CropImageCtrl',
  ['$scope', 'myImage', 'scopeEditProfile', '$mdDialog',
  function($scope, myImage, scopeEditProfile,$mdDialog){
	  
	  $scope.myCroppedImage='';	
	  $scope.myImage = myImage;
	  
	  $scope.saveCroppedImg = function(){
		  scopeEditProfile.showProfileImage = !scopeEditProfile.showProfileImage;
		  scopeEditProfile.srcImageProfile = this.myCroppedImage;
		  scopeEditProfile.fileImage =  this.myCroppedImage;
		  $mdDialog.hide();
	  }
	  
	  $scope.closeCropDialog = function(){
			$mdDialog.hide();
	  }
}]);