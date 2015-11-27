angular.module('murnow')
.factory('Intercom',[ '$http','$intercom', function($http,$intercom){
    
    this.boot = function(ev) {
		if( location.hostname == 'www.murnow.com' ) {
	        $intercom.boot(  {
			   app_id: 'ugedhl1s',
			   email: ev.email,
			   user_id: ev.id,
			   profile: location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/profile/"+ ev.id,
			   name: ev.username,
			   created_at: ev.created_at
			 } );
		} else {
			 $intercom.boot(  {
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
		window.update();
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
	    		
	    $intercom.trackEvent('added-review',metadata);
	};
	
	
	this.updateProfile = function(user){
		$intercom.update(  {
			name: user.username,
			email: user.email	,
			user_id: user.id
		});
					
		var metadata = {
					created_at: Math.floor(Date.now() / 1000),
					user_id: user.id, 
					edited_date: Math.floor(Date.now() / 1000)
		 }
    		
    	$intercom.trackEvent('edited-profile',metadata);	
	};
	
	this.likeReview = function(review, user_id){
		
		var metadata = {
			user_id: user_id, 
			receiver_upvote:  location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/profile/"+ review.user_id,
			review_id: review.id,
			product_url: location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/products/"+ review.product_id
		}
	    		
	    $intercom.trackEvent('added-upvote',metadata);
	}
	
	this.shutdown = function() {
		$interocm.shutdown();	
	};
	
	this.requestProduct = function(request){
		var metadata = {
			brand_name: request.brand_name,
			product_name: request.product_name,
			optional_message: request.optional_message,
			request_date: Math.floor(Date.now() / 1000),
			user_id: request.user_id,
			user_profile:location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/profile/"+ request.user_id
		}
		
	    $intercom.trackEvent('requested-product',metadata);

	};
	
	
	return this;
}]);



