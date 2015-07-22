class User < ActiveRecord::Base
  	# Include default devise modules. Others available are:
  	# :lockable, :timeoutable and :omniauthable
  	has_many :user_skin_problems
	has_many :skin_problems, :through => :user_skin_problems
	has_many :votes
	has_many :reviews
	
  	devise :database_authenticatable, :confirmable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, :omniauth_providers => [:facebook]

  	validates :username, presence: true 
  	validates :skin_type, :inclusion=> { :in => ['Dry','Combination', 'Oily'] }, :allow_nil => true
  	validates :skin_color, :inclusion=> { :in => ['Porcelain', 'Ivory', 'Beige',
  	 'Caramel', 'Mocha', 'Dark Chocolate'] }, :allow_nil => true
  	validates :skin_tone, :inclusion=> { :in => [ 'Warm', 'Neutral', 'Cool'] }, :allow_nil => true
  	
	def self.from_omniauth(auth)
		
		@s3 = Aws::S3::Resource.new()  
		hash_url_image = Digest::SHA256.hexdigest(auth.info.email) 
		
		logger.info "hash_url_image: " + hash_url_image
		
		
		
		user = User.find_by(email: auth.info.email)
		logger.info "*****************______>>>>>> #{auth.inspect}"
		if user.nil? then
			# Find row with where data and if is not in the database we create new one
			# however must pass validations
		  	where(provider: auth.provider, uid: auth.uid).first_or_create do |user|


		  						user.skip_confirmation! 
				user.email = auth.info.email
				
				user.hash_url_image = hash_url_image
				logger.info "(auth.info.image: " + auth.info.image
				obj = @s3.bucket('murnow').object('profile_images_' + Rails.env + '/'+hash_url_image + ".jpg")
				
				open("fileToS3", "wb") do |file|
				  open(auth.info.image) do |uri|
				     file.write(uri.read)
				  end
				end
		
				resp = obj.upload_file("fileToS3",  acl:'public-read')  # Writing image file to AWS murnow bucket
				
				user.password = Devise.friendly_token[0,20]
				user.username = auth.info.name   # assuming the user model has a name
			end
		else 
		    logger.info "user in from_omniauth ====> #{user.inspect}"
			user.skip_confirmation! 
			user.provider = auth.provider
			user.uid = auth.uid
			if user.hash_url_image.blank? then
				
				logger.info "Image in the database is empty adding image from facebook."
				
			 	user.hash_url_image = hash_url_image
			 	obj =  @s3.bucket('murnow').object('profile_images_' + Rails.env + '/'+hash_url_image + ".jpg")
			 
			 	open("fileToS3", "wb") do |file|
				  open(auth.info.image) do |uri|
				     file.write(uri.read)
				  end
				end
		
				resp = obj.upload_file("fileToS3",  acl:'public-read')  # Writing image file to AWS murnow bucket
				

			end
			user.save
			return user
		end
	 
	end

	def self.new_with_session(params, session)
    	super.tap do |user|
      		if data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["raw_info"]
        		user.email = data["email"] if user.email.blank?
      		end
    	end
  	end
  	
  	private

  	def open_uri(url)
	  require 'open-uri'
	end	
	
end
