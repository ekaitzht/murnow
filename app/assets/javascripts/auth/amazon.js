angular.module('murnow')
.factory('Amazon',[ '$http', function($http){
    
    var o = {};

    o.policy = undefined;
  	o.signature = undefined;
    
	o.getS3PolicyDocument = function (searchQuery) {
	     return $http.get('/amazon/policy/');
	  };

	o.fromState = null;

	return o;
}]);



