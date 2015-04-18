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


	o.updateUserProfile = function(user, skin_problems){
		o.user_session.username = user.username;
		o.user_session.skin_color = user.skin_color;
		o.user_session.skin_type = user.skin_type;
		o.user_session.skin_tone = user.skin_tone;

		o.user_session.bio = user.bio;
		o.user_session.image = user.image;
		o.user_session.age = user.age;

		angular.forEach(user.skin_problems, function(value, key) {
			if (value.state) {
				$http.put('/users/'+user.id+'/skin_problems/'+value.id);
			} else {
				$http.delete('/users/'+user.id+'/skin_problems/'+value.id);
			}
		});
		
		return $http.put('/users', {user: 
	    {
	     username: user.username,
	     skin_type: user.skin_type, 
	     skin_color: user.skin_color,
	   	 skin_tone: user.skin_tone,
	     bio: user.bio,
	     image: user.image,
	     age: user.age

	      }
	 	});
	};


	o.getSkinProblems  = function(user_id) {
		var id = user_id || o.user_session.id;
	    return $http.get('/users/'+id+'/skin_problems');
	};


	o.getPublicUser = function(id) {
 		return $http.get('/users/' + id).then(function(res){
    		return res.data;
  		});
	};

	o.getReviewsUser = function(id) {
  		return $http.get('/reviews_by_user/'+id);
	};


	o.fromState = null;

	return o;
}]);



