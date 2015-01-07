class User < ActiveRecord::Base
  	# Include default devise modules. Others available are:
  	# :lockable, :timeoutable and :omniauthable
  	devise :database_authenticatable, :confirmable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, :omniauth_providers => [:facebook]

  	validates :username, presence: true 

	def self.from_omniauth(auth)
		user = User.find_by(email: auth.info.email)
		logger.info "*****************______>>>>>> #{auth.inspect}"
		if user.nil? then
			# Find row with where data and if is not in the database we create new one
			# however must pass validations
		  	where(provider: auth.provider, uid: auth.uid).first_or_create do |user|


		  		logger.info "hey I am here -=====---------"
				user.skip_confirmation! 
				user.email = auth.info.email
				user.image = auth.info.image
				user.password = Devise.friendly_token[0,20]
				user.username = auth.info.name   # assuming the user model has a name
			end
		else 
		    logger.info "user in from_omniauth ====> #{user.inspect}"
			user.skip_confirmation! 
			user.provider = auth.provider
			user.uid = auth.uid
			user.image = auth.info.image
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
end
