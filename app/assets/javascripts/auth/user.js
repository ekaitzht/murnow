angular.module('murnow')
.factory('User',[ '$http', function($http){
    
    var o = {};

    o.user_session = {};

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

	o.setUser = function(user) {
 		o.user_session = user;
	};

	o.updateUser = function(user){
		o.user_session.username = user.username;
		o.user_session.skin_color = user.skin_color;
		o.user_session.skin_type = user.skin_type;
		o.user_session.bio = user.bio;
		return $http.put('/users', {user: 
	    {
	     username: user.username,
	     skin_type: user.skin_color, 
	     skin_color: user.skin_type,
	     bio: user.bio	      }
	 	});
	};

	o.fromState = null;

	return o;
}]);



