angular.module('murnow')
.controller('SearchCtrl', ['$scope','$state','$log', '$q','products', function($scope, $state, $log,$q, products){
 var self = this;
    // list of `state` value/display objects
    self.states        = loadAll();
    self.selectedItem  = null;
    self.searchText    = null;
    self.querySearch   = querySearch;
    self.simulateQuery = true;
    self.isDisabled    = false;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;
    self.submittingTextSearch   = submittingTextSearch;
    
    // ******************************
    // Internal methods
    // ******************************
    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        
		results = products.searchForAutoComplete(query);
        
        deferred.resolve( results ); 
        
        return deferred.promise;
      } else {
        return results;
      }
    }
    function searchTextChange(text) {
	  
      $log.info('Text changed to ' + text);
    }
    function selectedItemChange(item) {
	      $state.go('products', {id: item.id});
      $log.info('Item changed to ' + item);
    }
 
 
   function submittingTextSearch(searchText) {
  

   		$state.go('list_products', { searchQuery: searchText});

  	}
  	
  	
    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
      var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';
      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };
    }
  
  }]);
  
  /*
	  <md-autocomplete
          ng-disabled="ctrl.isDisabled"
          md-no-cache="ctrl.noCache"
          md-selected-item="ctrl.selectedItem"
          md-search-text-change="ctrl.searchTextChange(ctrl.searchText)"
          md-search-text="ctrl.searchText"
          md-selected-item-change="ctrl.selectedItemChange(item)"
          md-items="item in ctrl.querySearch(ctrl.searchText)"
          md-item-text="item.display"
          md-min-length="0"
          placeholder="What is your favorite US state?">
        <span md-highlight-text="ctrl.searchText" md-highlight-flags="^i">{{item.display}}</span>
      </md-autocomplete> */










//var searchQuery = $scope.searchFilter.searchQuery;
 //	$state.go('list_products', { searchQuery: searchQuery});