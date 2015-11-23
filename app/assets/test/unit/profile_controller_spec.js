 describe('ProfileController',function(){
        
        
        beforeEach(module('app'));
        var ctrl;
        var $httpBackend;
        
        beforeEach(inject(function($injector){
                $httpBackend = $injector.get('$httpBackend');
        }));
        
        beforeEach(inject(function($rootScope, $controller){
                scope = $rootScope.$new();
                ctrl =  $controller('Profile', { $scope: scope });
        }));
        
        
        describe('$scope.followUser', function() {
            it('increments followers_count', function() {
        
                  $httpBackend.expect('GET','http://localhost:5000/api/relationships/').respond(200);
                  $scope.user.followers_count = 0
                  $scope.followed_id = 77; 
              $scope.folowUser(77);
              $httpBackend.flush();
              expect($scope.user.followers_count).toBeGreaterThan(0);
            });
        });
 
 });