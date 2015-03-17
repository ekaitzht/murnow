angular.module('murnowFilters',[]).
  filter('fromNow',  function() {
    return function(dateString) {
	  /*if(moment(dateString).hour() < 24 ) {
		return moment(dateString).fromNow()
	  } else if (moment(dateString).hour() < 365){
		return moment(dateString).format("MMM DD");
	  } else {
		return moment(dateString).format("MMM DD YYYY");
	  }*/
	  return moment(dateString).twitter();
      
    };
  });
  
  
