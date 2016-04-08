angular.module('youtubeGrid',[])
.directive('youtubeGrid',function( $state, Dialog, Vote){
	return {
		restrict: 'E',
		scope: {
			name: '=',
			brand: '='
			
		},
		replace:true,
		templateUrl:'directives/_youtubeGrid.html',
		
		controller:['$scope', '$sce', function($scope, $sce){
			
			
			var youtubeCall = ('https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + $scope.name + ' ' + $scope.brand + ' review&maxResults=12&key=AIzaSyCR5In4DZaTP6IEZQ0r1JceuvluJRzQNLE');
            $.getJSON(youtubeCall).then(function(response) {
               $scope.videos = response.items;
               
               
               
            });
            
             
            $scope.trustSrc = function(videoId) {
			    return $sce.trustAsResourceUrl( 'https://www.youtube.com/embed/' + videoId);
			}
          
		}]
	};
});








