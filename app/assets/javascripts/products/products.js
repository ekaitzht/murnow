angular.module('murnow')
.factory('products',[ '$http', function($http){
    
    var o = {
    	products: [],
    	searchQuery: "",
    	from: 0,
    	accumulateProducts:[]
    	
  	};
  	var searchToElasticSearch = function(query){
	  	$("#progress-circular").show();
        $("#search-box-input").blur();
        return $http.get('/search/?q='+query+'&from='+ o.from).success(function(data){
	     	angular.copy(data, o.products);
	     	$.merge( o.accumulateProducts, data.search);
		 	$("#progress-circular").hide();
		});
  	}
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

	o.searchFirstPage = function (searchQuery) {    
		
		o.searchQuery = searchQuery;     
		
		o.from = 0;
		return searchToElasticSearch(searchQuery)		
	 
	};
  
	o.searchNextPage = function () {
	  	  o.from += 20;
	      return searchToElasticSearch(o.searchQuery)   
	};
  
  
	o.upvoteReview = function(user_id, review_id) {
  	return $http.put('/votes/' + review_id + '/users/'+ user_id);
   	 
	};

	return o;
}]);

