class User < ActiveRecord::Base
  	# Include default devise modules. Others available are:
  	# :lockable, :timeoutable and :omniauthable
  	has_many :user_skin_problems
	has_many :skin_problems, :through => :user_skin_problems
	has_many :votes
	has_many :reviews, dependent: :destroy
	
	has_many :active_relationships, class_name:  "Relationship",foreign_key: "follower_id",dependent:   :destroy
	has_many :passive_relationships, class_name:  "Relationship", foreign_key: "followed_id", dependent:   :destroy

    has_many :following, through: :active_relationships, source: :followed
	has_many :followers, through: :passive_relationships, source: :follower

	
	#has_many :sent_invitations, :class_name => 'Invitation', :foreign_key => 'sender_id'
	belongs_to :invitation
	
  	devise :database_authenticatable, :confirmable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, :omniauth_providers => [:facebook]

  	validates :username, presence: true 
  	validates :skin_type, :inclusion=> { :in => ['normal','dry','combination', 'oily'] }, :allow_nil => true
  	validates :eye_color, :inclusion=> { :in => ['brown','green','blue', 'grey','hazel','black'] }, :allow_nil => true
  	validates :skin_tone, :inclusion=> { :in =>  ['ivory', 'peach', 'sand','toast', 'caramel','cocoa','expresso' ] }, :allow_nil => true
  	validates :followers, length: { minimum: 0 }
  	validates :following, length: { minimum: 0 }

	def self.from_omniauth(auth)
		logger.info "*****************______>>>>>> #{auth.inspect}"
		@s3 = Aws::S3::Resource.new()  
		hash_url_image = Digest::SHA256.hexdigest(auth.info.email) + "_"+Digest::SHA256.hexdigest(ENV['APP_URL'])+ "_" + Time.now.to_i.to_s
		
		logger.info "hash_url_image: " + hash_url_image
		
		
		
		user = User.find_by(email: auth.info.email)
		logger.info "*****************______>>>>>> #{auth.inspect}"
		if user.nil? then
			# Find row with where data and if is not in the database we create new one
			# however must pass validations
		  	where(provider: auth.provider, uid: auth.uid).first_or_create do |user|


		  		user.skip_confirmation! 
				user.email = auth.info.email
				user.bio = auth.extra.raw_info.bio
				
				user.hash_url_image = hash_url_image
				obj = @s3.bucket('murnow').object('profile_images_' + Rails.env + '/'+hash_url_image)
				
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
				
				
			 	user.hash_url_image = hash_url_image
			 	obj =  @s3.bucket('murnow').object('profile_images_' + Rails.env + '/'+hash_url_image)
			 
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
  	
  	

  	
  	
	 # Follows a user.
	def follow(other_user)
		active_relationships.create(followed_id: other_user.id)
	end
	
	# Unfollows a user.
	def unfollow(other_user)
		active_relationships.find_by(followed_id: other_user.id).destroy
	end
	
	
	# Returns true if the current user is following the other user.
	def following?(other_user)
	    following.include?(other_user)
  	end
  	
  	private

  	def open_uri(url)
	  require 'open-uri'
	end	
	
end
