class Api::InvitationsController < ApplicationController
   	before_filter :authenticate_user!, :only => [:create]
   	
	def create
		if current_user.email = 'ekaitz7@gmail.com'
			@invitation = Invitation.create(token: Digest::SHA1.hexdigest([Time.now, rand].join), spoiled: false) 
			url = ENV['APP_URL'] +'/join'+@invitation.token
			render json: {invitation_url: url}
		end

    end
    
    def request_invitation
	    CustomMailer.request_invitation(request_params).deliver
		respond_with({:status => 200}, :location => nil)
	end
	
	private
	def request_params
    	params.require(:request).permit(:name, :email)
  	end
end




 