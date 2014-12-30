angular.module('flapperNews')
.factory('users',[ '$http', function($http){
    
    var o = {
    	users: []
  	};

    o.forgotPassword = function(email) {
	    return $http.post('/users/password.json', {user: {email: email} });
	};

	o.changePassword = function(newPassword, confirmPassword, resetPasswordToken) {
	    return $http.put('/users/password.json', {user: 
	    {
	     password: newPassword,
	     password_confirmation: confirmPassword, 
	     reset_password_token: resetPasswordToken }
	 	});
	  };

	o.send_confirmation_instructions  = function(email) {
	    return $http.post('/users/confirmation', {user: 
	    { email: email }
	 	});
	  };


	 o.fromState = null;

	return o;
}]);


