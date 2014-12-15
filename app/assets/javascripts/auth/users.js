angular.module('flapperNews')
.factory('users',[ '$http', function($http){
    
    var o = {
    	users: []
  	};

    o.resetPassword = function(email) {
	    return $http.post('/users/password', {email: email}).success(function(data){
	 
	    });
	  };

	return o;
}]);
