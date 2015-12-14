class Api::VotesController < ApplicationController
	before_filter :authenticate_user!
  	def create
  		logger.info params.inspect
  	  	@response =  Vote.create(user_id: params[:user_id], review_id: params[:review_id])
  	  	
  	  	@user_gives_like = User.find_by_id(params[:user_id])
  	  	@user_receives_like = User.find_by_id(Review.find(params[:review_id]).user_id)
  	  	@product_reviewed = Product.find_by_id(Review.find(params[:review_id]).product_id)
  	  	
  	  	
  	  	params['email_to'] = @user_receives_like.email
  	  	params['username_gives_like'] = @user_gives_like.username
  	  	params['username_receives_like'] = @user_receives_like.username
  	  	
  	  	
  	  	CustomMailer.review_liked_by_user(params).deliver
        respond_with @response
  	end
end


