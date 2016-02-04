angular.module('murnow')
.factory('products',[ '$http', '$rootScope','Dialog', 'Intercom', 'Auth', function($http, $rootScope, Dialog, Auth, Intercom){
    
    var o = {
    	products: [],
    	searchQuery: "",
    	from: 0,
    	accumulateProducts:[]
    	
  	};
  	var searchToElasticSearch = function(query){
	  	$("#progress-circular").show();
        
        return $http.get('/api/search/?q='+query+'&from='+ o.from).success(function(data){
	     	angular.copy(data, o.products);
	     	$.merge( o.accumulateProducts, data.search);
		 	$("#progress-circular").hide();
		});
  	}
  o.getAll = function() {
	    return $http.get('/api/products.json').success(function(data){
	      angular.copy(data, o.products);
	    });
	};

	o.get = function(id) {
 		return $http.get('/api/products/' + id).then(function(res){
    		return res.data;
  		});
	};

	o.addReview = function(id, review) {
  		return $http.post('/api/products/' + id + '/reviews', review);
	};
	
	o.getMostPopularReviews = function(id, review) {
  	    return $http.get('/api/most_popular_reviews_for_the_most_popular_products').success(function(data){
	  	    angular.copy(data, o.products);
  	    });
	};
	
	
	o.getTrendingProducts = function(query){
	  	$("#progress-circular").show();
        
        return $http.get('/api/trending/?q='+query).success(function(data){
	     	angular.copy(data, o.products);
		 	$("#progress-circular").hide();
		});
  	}


	o.searchFirstPage = function (searchQuery) {    

		o.searchQuery = searchQuery;     
		
		o.from = 0;
		fbq('track', 'Search');
		ga('send', 'event', 'MayorAction', 'Search', searchQuery);
		return searchToElasticSearch(searchQuery)		
	 
	};
	
	o.searchForAutoComplete = function (query) {    
		o.searchQuery = query;
		return $http.get('/api/search_autocomplete/?q='+query).then(function(data){
	     	return data.data.search;
		});
	 
	};
	
	
  
	o.searchNextPage = function () {
	  	  o.from += 20;
	      return searchToElasticSearch(o.searchQuery)   
	};
  
  

	
	
	return o;
}]);

