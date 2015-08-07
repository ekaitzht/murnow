angular.module('reviewCard',[])
.directive('reviewCard', function(){
	return {
		restrict: 'E',
		scope: {
			review: '='
			
		},
		replace:true,
		templateUrl:'directives/_reviewCard.html',
		controller:function($scope){
			
		}
	};
});