angular.module('murnow')
.factory('Invitations',[ '$http', function($http){
    
 
	this.generateInvitation = function(request){
	    return $http.post('/api/generateinvitation');
	};

	return this;
}]);



