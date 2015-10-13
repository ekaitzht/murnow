angular.module('murnow')
.factory('Intercom',[ '$http', function($http){
    
    this.boot = function(ev) {
		if( location.hostname == 'www.murnow.com' ) {
	        window.Intercom('boot',  {
			   app_id: 'ugedhl1s',
			   email: ev.email,
			   user_id: ev.id,
			   profile: location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/profile/"+ ev.id,
			   name: ev.username,
			   created_at: ev.created_at
			 } );
		} else {
			 window.Intercom('boot',  {
			   app_id: 'xjo9xumi',
			   email: ev.email,
			   user_id: ev.id,
			   profile: location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/profile/"+ ev.id,
			   name: ev.username,

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
	};
	
	this.likeReview = function(review, user_id){
		
		var metadata = {
			user_id: user_id, 
			receiver_upvote:  location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/profile/"+ review.user_id,
			review_id: review.id,
			product_url: location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/products/"+ review.product_id
		}
	    		
	    window.Intercom('trackEvent','added-upvote',metadata);
	}
	this.shutdown = function() {
		window.Intercom('shutdown'); 	
	};
	
	
	return this;
}]);



