angular.module('murnow')
.factory('products',[ '$http', function($http){
    
    var o = {
    	products: []
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
        return $http.get('/search/?q='+searchQuery).success(function(data){
        angular.copy(data, o.products);
      });
  };


	o.upvoteReview = function(product, review) {
  	return $http.put('/products/' + product.id + '/reviews/'+ review.id + '/upvote')
   	 .success(function(data){
     		review.upvotes += 1;
  	});
	};



	
	return o;
}]);
