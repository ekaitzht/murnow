angular.module('murnow')
.factory('Vote',[ '$http','Auth', 'Intercom', 'Dialog', function($http, Auth, Intercom, Dialog){
    
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
				    
				    this.create(Auth._currentUser.id, review.id).success(function(data){
					    
					    
					    if ( data.is_liked === false) {
							review.votes.length += 1;
							Intercom.likeReview(review, Auth._currentUser.id);
							self.update(data.id, {vote:{ is_liked: true, is_sent:true}})			

						} else {
							review.votes.length -= 1;
							self.update(data.id, {vote:{ is_liked: false, is_sent:true}})
						}
 
				    }).error(function(err){
					    
				    });
				}
	}

	return this;
}]);


