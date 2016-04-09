angular.module('murnow')
.controller('ShowVideoCtrl',
  ['$scope', 'videoId', 'Dialog', '$sce',
function($scope, videoId,  Dialog, $sce){

	
	$scope.videoId = videoId;
	
	$scope.closeDialog = function() {
    	Dialog.hide();
	};
	
	
	$scope.trustSrc = function(videoId) {
		return $sce.trustAsResourceUrl( 'https://www.youtube.com/embed/' + videoId);
	}
	

}]);


