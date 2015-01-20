class VotesController < ApplicationController
	before_filter :authenticate_user!
  	def create
  		logger.info params.inspect
  	  	@response =  Vote.create(user_id: params[:user_id], review_id: params[:review_id])

        respond_with @response
  	end


end



 