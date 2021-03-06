angular.module('murnow')
.factory('Vote',[ '$http','Auth', 'Intercom', 'Dialog', '$q', function($http, Auth, Intercom, Dialog, $q){
    
	this.create = function(user_id, review_id){
	    return $http.post('/api/votes/', {vote: {user_id: user_id, review_id: review_id}});
	};
	
	this.update = function(id, data){
	    return $http.put('/api/votes/'+id, data);
	};
	

	
	this.incrementUpvotes = function(review){
		var self = this;
		
		if(Auth._currentUser === null){
					Dialog.notSignUpUpvoteReview()
		} else {
			var q = $q.defer()

		    // First we try to create the object is it retuns false is the first time that we create the object
		    this.create(Auth._currentUser.id, review.id).success(function(data){
			    
			    
			    if ( data.is_liked === false) {
					
					Intercom.likeReview(review, Auth._currentUser.id);
					ga('send', 'event', 'MinorAction', 'Like', 'User gives like to review review_id='+review.id);
					self.update(data.id, {vote:{ is_liked: true, is_sent:true}});
					q.resolve(true);			

				} else {
					
					ga('send', 'event', 'MinorAction', 'Unlike', 'User gives unlike to review review_id='+review_id);
					self.update(data.id, {vote:{ is_liked: false, is_sent:true}});
					q.resolve(false);
				}

		    }).error(function(err){
			    q.reject(err);
		    });
		    return q.promise;
		    
		}
	}
	return this;
}]);

