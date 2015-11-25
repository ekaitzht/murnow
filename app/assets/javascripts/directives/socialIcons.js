angular.module('socialIcons',[])
.directive('socialIcons', ['$state', function( $state){
	return {
		restrict: 'E',
		scope: {
			review: '=',
			index: '='
			
		},
		replace:true,
		templateUrl:'directives/_socialIcons.html'
		
		
	};
}]);




