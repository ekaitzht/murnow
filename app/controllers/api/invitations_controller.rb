class Api::InvitationsController < ApplicationController
   	before_filter :authenticate_user!, :only => [:create]
   	
	def create
		if current_user.email = 'ekaitz7@gmail.com'
			@invitation = Invitation.create(token: 'join'+Digest::SHA1.hexdigest([Time.now, rand].join), spoiled: false) 
			url = 'http://' + ENV['APP_URL'] + '/'+@invitation.token
			render json: {invitation_url: url}
		end

    end
    
    def request_invitation
	    CustomMailer.request_invitation(request_params).deliver
		respond_with({:status => 200}, :location => nil)
	end
	
	def check_register_token 
		@invitation = Invitation.find_by_token(params[:token])
		
	    if @invitation.nil? 
		    respond_with({:msg => "Token not exists."}, :status => 400)  
		elsif @invitation.spoiled == false
			@invitation.spoiled = true;
			@invitation.save 
			respond_with({:msg => "Token ok"}, :status => 200)
		else 
			respond_with({:msg => "Token expired"}, :status => 401)
		end
	end
	
	private
	def request_params
    	params.require(:request).permit(:name, :email)
  	end
end