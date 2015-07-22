angular.module('murnow')
.factory('Amazon',[ '$http','$upload',
 function($http,$upload){
    
    var o = {};

    o.policy = undefined;
  	o.signature = undefined;
  	o.folder = undefined;
    
	o.getS3PolicyDocument = function (searchQuery) {
	     return $http.get('/amazon/policy/');
	  };
	 
	  
	o.uploadUserProfilePhoto = function(dataURI){
		var file = this.dataURItoBlob(dataURI);
		return  $upload.upload({   //check app/controllers/amazon_controller to complain with the same policy singed.
	        url: 'https://murnow.s3.amazonaws.com/', 
	        method: 'POST',
	        data : {
	          key: o.folder + o.unique_name_file_hash, // the key to store the file on S3, could be file name or customized
	          AWSAccessKeyId: 'AKIAI7BVF5NB3PEWGV2Q', 
	          acl: 'public-read', // sets the access to the uploaded file in the bucket: private or public 
	          policy: o.policy, // base64-encoded json policy (see article below)
	          signature: o.signature, // base64-encoded signature based on policy string (see article below)
	          "Content-Type": file.type, // content type of the file (NotEmpty),
	          filename: '' // this is needed for Flash polyfill IE8-9
	        },
	        file: file, 
	      });
	};
	
	
	o.dataURItoBlob = function (dataURI) {
	    // convert base64/URLEncoded data component to raw binary data held in a string
	    var byteString;
	    if (dataURI.split(',')[0].indexOf('base64') >= 0)
	        byteString = atob(dataURI.split(',')[1]);
	    else
	        byteString = unescape(dataURI.split(',')[1]);
	
	    // separate out the mime component
	    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
	
	    // write the bytes of the string to a typed array
	    var ia = new Uint8Array(byteString.length);
	    for (var i = 0; i < byteString.length; i++) {
	        ia[i] = byteString.charCodeAt(i);
	    }
	
	    return new Blob([ia], {type:mimeString});
	}

	o.fromState = null;

	return o;
}]);



