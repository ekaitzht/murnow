angular.module('murnow')
.factory('Intercom',[ '$http', function($http){
    
    this.boot = function(ev) {
		if( location.hostname == 'www.murnow.com' ) {
	        window.Intercom('boot',  {
			   app_id: 'ugedhl1s',
			   email: ev.email,
			   user_id: ev.id,
			   profile: location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/profile/"+ ev.id,
			   created_at: ev.created_at
			 } );
		} else {
			 window.Intercom('boot',  {
			   app_id: 'xjo9xumi',
			   email: ev.email,
			   user_id: ev.id,
			   profile: location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/profile/"+ ev.id,
			   created_at: ev.created_at
			 });
		}	 
	};

    this.update = function(data) {
		window.Intercom('update');
    };
	
	this.addReview = function(review){
		var metadata = {
			body: review.body,
			stars: review.stars,
			repurchase: review.repurchase,
			created_at: Math.floor(Date.now() / 1000),
			user_id: review.user_id, 
			product: document.URL,
			review_id: review.id,
			review_date: Math.floor(Date.now() / 1000)
		}
	    		
	    window.Intercom('trackEvent','added-review',metadata);
	};
	
	
	this.updateProfile = function(user){
		Intercom.boot('update',  {
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
	};
	
	
	this.shutdown = function() {
		Intercom('shutdown'); 	
	};
	
	
	return this;
}]);



