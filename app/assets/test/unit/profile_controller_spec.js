 describe('Profile',function(){
        
		beforeEach(module('templates'));
        beforeEach(module('murnow'));
        var ctrl; 
        var $httpBackend;
        var scope;
        var $rootScope;



        
       beforeEach(inject(function($injector) {
	     $httpBackend = $injector.get('$httpBackend');
		 $rootScope = $injector.get('$rootScope');
		 var $controller = $injector.get('$controller');
		 scope = $rootScope.$new();
		 
		 
		 ctrl =  $controller('Profile', { $scope: scope });
	   }));
	        
 
        it('increments followers_count', function() {
    
          $httpBackend.expectGET('http://localhost:5000/api/relationships/').respond(200);
          scope.user.followers_count = 0
          scope.followed_id = 77; 
          scope.folowUser(77);
          $httpBackend.flush();
          expect($scope.user.followers_count).toBeGreaterThan(0);
        });
        


 });