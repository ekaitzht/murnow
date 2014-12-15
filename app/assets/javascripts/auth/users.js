angular.module('flapperNews')
.factory('users',[ '$http', function($http){
    
    var o = {
    	users: []
  	};

    o.resetPassword = function(email) {
	    return $http.post('/users/password.json', {user: {email: email} });
	};

	 o.changePassword = function(newPassword, confirmPassword, resetPasswordToken) {
	    return $http.put('/users/password.json', {user: 
	    {
	     password: newPassword,
	     password_confirmation: confirmPassword, 
	     reset_password_token: resetPasswordToken }
	 	}).success(function(data){});
	  };

	return o;
}]);


