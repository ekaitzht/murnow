angular.module('socialIcons',[])
.directive('socialIcons', ['$state','$mdDialog', function( $state, $mdDialog){
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




