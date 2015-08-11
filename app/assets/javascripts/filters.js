angular.module('murnowFilters',[]).
  filter('fromNow',  function() {
    return function(dateString) {
	  return moment(dateString).twitterLong();
    };
  }).
   filter('limitLength',  function() {
    return function(overString, numChar, rootScope) {
	    
	    if( rootScope !== undefined) {
		    var state = rootScope.getCurrentNameState();
		    
		    if( state == 'profile' && (window.innerWidth > 900)){ 
			    return overString;
		    }
	    }
	    
	    if( overString.length >= numChar ) {
			return overString.substring(0, numChar) + '...';
				
		} else {
			return overString;
		}
    };
  });

  
  
  
  
