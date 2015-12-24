angular.module('murnow')
.factory('Reviews',[ '$http', function($http){
    
 
	this.deleteReview = function(review_id){
	    return $http.delete('/api/reviews/'+review_id);
	};
	
	this.editReview = function(review){
	    return $http.put('/api/reviews/'+review.id,review);
	};

	return this;
}]);


