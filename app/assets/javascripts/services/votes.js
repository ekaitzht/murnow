angular.module('murnow')
.factory('Vote',[ '$http','Auth', 'Intercom', 'Dialog', '$q', function($http, Auth, Intercom, Dialog, $q){
    
	this.create = function(user_id, review_id){
	    return $http.post('/api/votes/', {vote: {user_id, review_id: review_id}});
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

		    
		    this.create(Auth._currentUser.id, review.id).success(function(data){
			    
			    
			    if ( data.is_liked === false) {
					
					Intercom.likeReview(review, Auth._currentUser.id);
					self.update(data.id, {vote:{ is_liked: true, is_sent:true}});
					q.resolve(true);			

				} else {
					
					
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

