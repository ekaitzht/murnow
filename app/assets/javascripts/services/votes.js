angular.module('murnow')
.factory('Vote',[ '$http', function($http){
    
	this.create = function(user_id, review_id){
	    return $http.post('/api/votes/', {vote: {user_id, review_id: review_id}});
	};
	
	this.show = function(id){
	    return $http.put('/api/votes/'+id);
	};
	
	this.destroy = function(id){
	    return $http.delete('/api/votes/'+id);
	};

	return this;
}]);


