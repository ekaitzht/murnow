angular.module('flapperNews')
.factory('products',[ '$http', function($http){
    var o = {
    	products: []
  	};
    o.getAll = function() {
	    return $http.get('/products.json').success(function(data){
	      angular.copy(data, o.products);
	    });
	};
	return o;
}]);
