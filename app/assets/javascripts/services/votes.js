angular.module('murnow')
.factory('Vote',[ '$http','Auth', 'Intercom', 'Dialog', function($http, Auth, Intercom, Dialog){
    
	this.create = function(user_id, review_id){
	    return $http.post('/api/votes/', {vote: {user_id, review_id: review_id}});
	};
	
	this.show = function(id){
	    return $http.put('/api/votes/'+id);
	};
	
	this.destroy = function(id){
	    return $http.delete('/api/votes/'+id);
	};
	
	this.incrementUpvotes = function(review){
		var that = this;
		if(Auth._currentUser === null){
					
					Dialog.notSignUpUpvoteReview()
				} else {
				    
				    this.create(Auth._currentUser.id, review.id).success(function(data){
					    var vote_id = data.vote_id;
					    
					    if ( vote_id === false) {
							review.votes.length += 1;
							Intercom.likeReview(review, Auth._currentUser.id);

						} else {
							that.destroy(vote_id);
							review.votes.length -= 1;
						}
 
				    }).error(function(err){
					    
				    });
				}
	}

	return this;
}]);


