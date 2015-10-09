angular.module('murnow')
.controller('EditProfileCtrl', [
'$scope','User','$state', '$stateParams','$upload', 'Auth', 'Amazon','Dialog','$http', 'configMurnow',
function($scope, User, $state, $stateParams, $upload, Auth, Amazon, Dialog, $http, configMurnow){
	
	
	if(User.getAge() === null) {
		User.setAge(null) ;
	} else {
		User.setAge(new Date(User.getAge()));
	}
	
	$scope.user = User.getUser();
	$scope.myImage= '';
	$scope.myCroppedImage = '';
	
	$scope.fileImage = '';
	//$scope.skin_colors = ['Porcelain','Ivory', 'Beige','Caramel','Mocha','Dark Chocolate'];
	$scope.skin_tones = ['ivory', 'peach', 'sand','toast', 'caramel','cocoa','expresso' ];
	


	
	// Skin avatars 
	
	 $scope.avatarData = [{
        img: "/assets/skin_tones_avatars/ivory.png",
        title: 'Ivory',
        value: 'ivory'
      },{
        img: "/assets/skin_tones_avatars/peach.png",
        title: 'Peach',
        value: 'peach'
      },{
        img: "/assets/skin_tones_avatars/sand.png",
        title: 'Sand',
        value: 'sand'
    },{
        img: "/assets/skin_tones_avatars/toast.png",
        title: 'Toast',
        value: 'toast'
    },{
        img: "/assets/skin_tones_avatars/caramel.png",
        title: 'Caramel',
        value: 'caramel'
    },{
        img: "/assets/skin_tones_avatars/cocoa.png",
        title: 'Cocoa',
        value: 'cocoa'
    },{
        img: "/assets/skin_tones_avatars/expresso.png",
        title: 'Expresso',
        value: 'expresso'
    }];
        
    // SKIN TYPES
    $scope.skin_types = [{
        title: 'Normal',
        value: 'normal'
      },{
        title: 'Dry',
        value: 'dry'
      },{
        title: 'Combination',
        value: 'combination'
    },{
        title: 'Oily',
        value: 'oily'
    }];


      // EYES
   	 $scope.eye_colors = [{
        title: 'Brown',
        value: 'brown'
      },{
        title: 'Green',
        value: 'green'
      },{
        title: 'Blue',
        value: 'blue'
    },{
        title: 'Grey',
        value: 'grey'
    },{
        title: 'Hazel',
        value: 'hazel'
    },{
        title: 'Black',
        value: 'black'
    }];
    
    
	 
	$scope.cdn = configMurnow.cdn_domain_name;
	$scope.enviroment = configMurnow.enviroment;
  
    $scope.user.hash_url_image === null  ? $scope.showProfileImage = false : $scope.showProfileImage = true;
     
    
    
    $scope.srcImageProfile = "https://"+$scope.cdn+"/profile_images_"+$scope.enviroment+"/"+$scope.user.hash_url_image;
	
    User.getSkinProblems().success(function(data, status, headers, config) {
	    $scope.user.skin_problems =  data.skin_problems; 
	});
	  

   
  $scope.updateUser = function() {
	  
	  
	  
	  
    if ($scope.fileImage !== '') {
		Amazon.uploadUserProfilePhoto($scope.fileImage).progress(function(evt) {
		
		    var percent =  parseInt(100.0 * evt.loaded / evt.total);
		
		    console.log('progress: ' +percent + '% file :'+ evt.config.file.name);
		  }).success(function(data, status, headers, config) {
		    // file is uploaded successfully
		
		  
		    var random = (new Date()).toString();
		    $scope.user.hash_url_image= Amazon.unique_name_file_hash;
		    User.updateUserProfile($scope.user, $scope.skin_problems);
		    
		    Auth.currentUser().then(function(user) {$state.go('profile', {id: user.id});});
		    console.log('file ' + config.file.name + 'is uploaded successfully. Response: ' + data);
		}).error(function(err){
		
		});    
    } else { 
	    
        User.updateUserProfile($scope.user, $scope.skin_problems)
        Auth.currentUser().then(function(user) {
	     
	         $state.go('profile', {id: user.id});
	    }, function(error) {
	        // unauthenticated error
	    });
    }
  };


  $scope.$watch('file', function(newValue, oldValue) {
      if (newValue === oldValue) {
        return; 
      } 

      if ( ($scope.file[0].size/1024) >= 2048 ) { // if the file is bigger than  2048 KB
        Dialog.photoTooBig();
        return;      
      } 
      var file = $scope.file[0];
      
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
	       Dialog.cropImage(evt, $scope);
        });
      };
      reader.readAsDataURL(file);
  });
  
    $scope.goToProduct = function(product_id){
	  $state.go('products', { id: product_id});
	  

  }
  
    $scope.validateDate = function(){
	  

  	}

}]);
