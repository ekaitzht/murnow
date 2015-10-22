angular.module('murnow')
.controller('CropImageCtrl',
  ['$scope', 'myImage', 'scopeEditProfile', 'Dialog',
  function($scope, myImage, scopeEditProfile, Dialog){
	  
	  $scope.myCroppedImage='';	
	  $scope.myImage = myImage;
	  
	  $scope.saveCroppedImg = function(){
		  scopeEditProfile.showProfileImage = true;
		  scopeEditProfile.srcImageProfile = this.myCroppedImage;
		  scopeEditProfile.fileImage =  this.myCroppedImage;
		  Dialog.hide();
	  }
	  
	  $scope.closeCropDialog = function(){
			Dialog.hide();
	  }
}]);