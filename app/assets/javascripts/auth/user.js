angular.module('murnow')
.factory('User',[ '$http', function($http){
    
    // We wrap in object only the user data to have a easy access when we want the attributes of the user
    this.user = {
	    id: undefined,
	    username:undefined,
	    skin_type: undefined,
	    skin_color: undefined,
	    eye_color: undefined,
	    bio: undefined,
	    youtube_channel: undefined,
	    instagram_profile: undefined,
	    hash_url_image: undefined,
	    age:undefined
    }; 	

    this.forgotPassword = function(email) {
	    return $http.post('/users/password.json', {user: {email: email} });
	};

	this.changePassword = function(newPassword, confirmPassword, resetPasswordToken) {
	    return $http.put('/users/password.json', {user: 
	    	{
			    password: newPassword,
			    password_confirmation: confirmPassword, 
			    reset_password_token: resetPasswordToken 
	    	}
	 	});
	  };

	this.send_confirmation_instructions  = function(email) {
	    return $http.post('/users/confirmation', {user: 
	    { email: email }
	 	});
	};
	
	
	this._curateInstagram = function(instagram_profile) {
		if(instagram_profile !== null){
			if (instagram_profile.charAt(0) == '@'){
				return instagram_profile.substring(1);
			} else {
				return instagram_profile;
			}
		}
	}

	this.setUser = function(user) {
		this.user.id = user.id;
 		this.user.username = user.username;
		this.user.skin_type = user.skin_type;
		this.user.skin_color = user.skin_color;
		this.user.skin_tone = user.skin_tone;
		this.user.eye_color = user.eye_color;
		this.user.bio = user.bio;
		this.user.youtube_channel = user.youtube_channel;
		this.user.instagram_profile = this._curateInstagram(user.instagram_profile);
		this.user.hash_url_image = user.hash_url_image;
		this.user.age = user.age;
	};
	
	
	this.getUser = function(){
		return this.user;
	}
	
	
	// Age
	this.getAge = function(){
		return this.user.age;
	}
	
	this.setAge = function(age){
		this.user.age = age;
	}
	
	//Id
	this.getId = function(){
		return this.user.id;
	}
	
	this.setId = function(id){
		this.user.id = id;
	}
	
	this.updateUserProfile = function(user, skin_problems){
		this.setUser(user);

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
    		 
		angular.forEach(user.skin_problems, function(value, key) {
			if (value.state) {
				$http.put('/api/users/'+user.id+'/skin_problems/'+value.id);
			} else {
				$http.delete('/api/users/'+user.id+'/skin_problems/'+value.id);
			}
		});
		
		return $http.put('/users/', {user: this.user});
	};


	this.getSkinProblems  = function(user_id) {
		var id = user_id || this.user.id;
	    return $http.get('/api/users/'+id+'/skin_problems');
	};


	this.getPublicUser = function(id) {
 		return $http.get('/api/users/' + id);
	};

	this.getReviewsUser = function(id) {
  		return $http.get('/api/reviews_by_user/'+id);
	};

	this.fromState = null;

	return this;
}]);



