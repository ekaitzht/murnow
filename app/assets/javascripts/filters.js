angular.module('murnowFilters',[]).
  filter('fromNow',  function() {
    return function(dateString) {
	  return moment(dateString).twitterLong();
    };
  });
  
  
