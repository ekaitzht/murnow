 describe('Profile',function(){
        
		beforeEach(module('templates'));
        beforeEach(module('murnow'));
        var ctrl; 
        var $httpBackend;
        var scope;
        var $rootScope;
        var Auth;
		


        
       beforeEach(inject(function($injector) {
	     $httpBackend = $injector.get('$httpBackend');
	     Auth = $injector.get('Auth');
		 $rootScope = $injector.get('$rootScope');
		 var $controller = $injector.get('$controller');
		 scope = $rootScope.$new();
		 
		 $httpBackend.whenPOST('/users/sign_in.json').respond(200,'{"id":75,"email":"ekaitz7@gmail.com","created_at":"2015-09-22T12:30:55.634Z","updated_at":"2015-11-25T19:10:14.040Z","username":"ekaitz7gmail","provider":null,"uid":null,"bio":null,"skin_type":"combination","favourite_brand":null,"skin_tone":"cocoa","hash_url_image":"5de39ea38b04e82f5e19145bfe02b344bf869a38dab895e8c506b0797fa04b82_b6225b2785d9866da5e7e57e18f74c495360b073c88210e928bbef6dcff17263_1446157660","eye_color":"hazel","instagram_profile":null,"youtube_channel":null,"age":"1970-10-13T23:00:00.000Z","followers_count":0,"following_count":8}');
		 $httpBackend.whenGET('/api/most_popular_reviews_for_the_most_popular_products').respond(200);
		 $httpBackend.whenGET('/api/users/undefined').respond(200);
		 $httpBackend.whenGET('home/_reviews.html').respond(200);
		 
		 ctrl =  $controller('Profile', { $scope: scope });
	   }));
	        
 
        it('follows user', function() {
		  //$httpBackend.expectPOST('../users/sign_in.json').respond(200);
		  	//$httpBackend.expect('POST', '/users/sign_in.json', '{"user":{}}').respond(201, '');
          
          $httpBackend.expectPOST('/api/relationships/').respond(200);
		  
        
          scope.followed_id = 77; 
          scope.followUser(77);
          $httpBackend.flush();
          expect($scope.user.followers_count).toBeGreaterThan(0);
        });
        


 });