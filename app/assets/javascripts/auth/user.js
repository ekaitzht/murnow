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
		window.Intercom('update',  {
					 name: user.username,
					 email: user.email	,
					 user_id: user.id
					});
					
		var metadata = {
					created_at: Math.floor(Date.now() / 1000),
					user_id: user.id, 
					edited_date: Math.floor(Date.now() / 1000)
		 }
    		
    		window.Intercom('trackEvent','edited-profile',metadata);
    		
    						
		if(user.instagram_profile !== null){
			if (user.instagram_profile.charAt(0) == '@'){
				user.instagram_profile = user.instagram_profile.substring(1);
			}	
		}
	
		o.user_session.username = user.username;
		o.user_session.skin_type = user.skin_type;
		o.user_session.skin_tone = user.skin_tone;
		o.user_session.eye_color = user.eye_color;
		o.user_session.youtube_channel = user.youtube_channel;
		o.user_session.instagram_profile = user.instagram_profile;

		o.user_session.bio = user.bio;
		o.user_session.hash_url_image = user.hash_url_image;
		o.user_session.age = user.age;

		angular.forEach(user.skin_problems, function(value, key) {
			if (value.state) {
				$http.put('/api/users/'+user.id+'/skin_problems/'+value.id);
			} else {
				$http.delete('/api/users/'+user.id+'/skin_problems/'+value.id);
			}
		});
		
		return $http.put('/users/', {user: 
	    {
	     username: user.username,
	     skin_type: user.skin_type, 
	     skin_color: user.skin_color,
	   	 skin_tone: user.skin_tone,
	   	 eye_color: user.eye_color,
	     bio: user.bio,
	     youtube_channel: user.youtube_channel,
	     instagram_profile: user.instagram_profile,
	     hash_url_image: user.hash_url_image,
	     age: user.age

	      }
	 	});
	};


	o.getSkinProblems  = function(user_id) {
		var id = user_id || o.user_session.id;
	    return $http.get('/api/users/'+id+'/skin_problems');
	};


	o.getPublicUser = function(id) {
 		return $http.get('/api/users/' + id);
	};

	o.getReviewsUser = function(id) {
  		return $http.get('/api/reviews_by_user/'+id);
	};

	o.fromState = null;

	return o;
}]);



