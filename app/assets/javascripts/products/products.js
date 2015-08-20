angular.module('murnow')
.factory('products',[ '$http', '$rootScope','$mdDialog','Auth', function($http, $rootScope, $mdDialog, Auth){
    
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


	o.searchFirstPage = function (searchQuery) {    

		o.searchQuery = searchQuery;     
		
		o.from = 0;
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
  
  
	o.upvoteReview = function(Auth, review_id) {
		
		if(Auth._currentUser === null){
			 $mdDialog.show(
	          $mdDialog.alert()
	            .title('')
	            .content('You need to sign up to vote a comment!')
	            .ariaLabel('')
	            .ok('Got it!')
	        );
	
		} else {
			return $http.put('/api/votes/' + review_id + '/users/'+ Auth._currentUser.id);
		}
	};
	
	
	return o;
}]);

