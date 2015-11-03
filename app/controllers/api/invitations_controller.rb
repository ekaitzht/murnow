class Api::InvitationsController < ApplicationController
   	before_filter :authenticate_user!, :only => [:create]
   	
	def create
		if current_user.email = 'ekaitz7@gmail.com'
			@invitation = Invitation.create(token: Digest::SHA1.hexdigest([Time.now, rand].join), spoiled: false) 
			url = ENV['APP_URL'] +'/register/'+@invitation.token
			
			render json: {invitation_url: url}
		end

    end
end




 