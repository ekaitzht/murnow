angular.module('murnow')
.factory('products',[ '$http', function($http){
    
    var o = {
    	products: [],
    	searchQuery: "",
    	from: 0
  	};

  o.getAll = function() {
	    return $http.get('/products.json').success(function(data){
	      angular.copy(data, o.products);
	    });
	};

	o.get = function(id) {
 		return $http.get('/products/' + id).then(function(res){
    		return res.data;
  		});
	};

	o.addReview = function(id, review) {
  		return $http.post('/products/' + id + '/reviews', review);
	};

  o.search = function (searchQuery) {
        o.searchQuery = searchQuery;
        o.from = 0;
        $("#progress-circular").show();
        return $http.get('/search/?q='+searchQuery).success(function(data){
        angular.copy(data, o.products);
        $("#progress-circular").hide();

      });
  };
  
  o.searchNextPage = function () {  
	   o.from += 20
       return $http.get('/search/?q='+o.searchQuery+'&from='+ o.from );
  };

	o.upvoteReview = function(user_id, review_id) {
  	return $http.put('/votes/' + review_id + '/users/'+ user_id);
   	 
	};

	return o;
}]);

