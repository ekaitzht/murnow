class Api::AmazonController < ApplicationController
	before_action :authenticate_user!

	def policy
	 	
	 	logger.info "Policy controller"

	 	options =  {}
		options[:content_type] = ''
	    options[:acl] = 'public-read'
	    options[:max_file_size] = 2.megabyte
	    options[:path] = ''
		options[:folder] = 'profile_images_' + Rails.env + '/'
		
		
		@s3 = Aws::S3::Client.new()  # Credianls are in ENV 
		
		
  		  
  		@policy_document = "{\"expiration\": \"#{3.day.from_now.utc.strftime('%Y-%m-%dT%H:%M:%S.000Z')}\",
	        \"conditions\": [
	          {\"bucket\": \"#{ENV["S3_BUCKET"]}\"},
	          [\"starts-with\", \"$key\", \"#{options[:folder]}\"],
	          {\"acl\": \"#{options[:acl]}\"},
	          [\"starts-with\", \"$filename\", \"\"],
	          [\"starts-with\",\"$Content-Type\",\"\"],
	          [\"content-length-range\", 0, #{options[:max_file_size]}]
	        ]
	    }"
	    logger.info @policy_document

		policy = Base64.encode64(@policy_document).gsub(/\n|\r/, '')

		signature = Base64.encode64(
		    OpenSSL::HMAC.digest(
		        OpenSSL::Digest.new('sha1'), 
		          ENV['AWS_SECRET_ACCESS_KEY'], policy)
		    ).gsub("\n","")
 
		logger.info "Policy " + policy
		logger.info "Signature" + signature

		amazon = {}
		amazon[:policy] = policy
		amazon[:signature] = signature
		#This the key name that we will use to upload the image profile to AWS S3, always we will gnerate the same hash for the same id  id1 => hashid1
		amazon[:unique_name_file_hash] =  Digest::SHA256.hexdigest(current_user.email)  + "_"+ Digest::SHA256.hexdigest(ENV['APP_URL']) + "_"+ Time.now.to_i.to_s
		amazon[:folder] = options[:folder]
   
		respond_with amazon
	end
end

