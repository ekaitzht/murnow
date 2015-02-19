angular.module('murnow')
.controller('CropImageCtrl',
  ['$scope', 'myImage', 'scopeEditProfile', '$mdDialog',
  function($scope, myImage, scopeEditProfile,$mdDialog){
	  
	  $scope.myCroppedImage='';	
	  $scope.myImage = myImage;
	  
	  $scope.closedCropDialog = function(){
		  scopeEditProfile.user.image = this.myCroppedImage;
		  scopeEditProfile.fileImage =  this.myCroppedImage;
		  $mdDialog.hide();
	  }

}]);