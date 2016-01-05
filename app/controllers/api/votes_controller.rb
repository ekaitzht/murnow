class Api::VotesController < ApplicationController
	before_filter :authenticate_user!
  	def create

  	    	@vote =  Vote.where(user_id: vote_params[:user_id], review_id: vote_params[:review_id]).take
  			
  			
  			logger.info @vote.inspect			
  			if @vote.nil?
	  			@response =  Vote.create(user_id: vote_params[:user_id], review_id: vote_params[:review_id])
		  		@user_gives_like = User.find_by_id(vote_params[:user_id])
		  	  	@user_receives_like = User.find_by_id(Review.find(vote_params[:review_id]).user_id)
		  	  	@product_reviewed = Product.find_by_id(Review.find(vote_params[:review_id]).product_id)
		  	  	
		  	  	
		  	  	params['email_to'] = @user_receives_like.email
		  	  	params['username_gives_like'] = @user_gives_like.username
		  	  	params['username_receives_like'] = @user_receives_like.username
		  	  	
		  	  	params['product_id'] = @product_reviewed.id
		  	  	params['user_id_gives_like'] = @user_gives_like.id
		  	  	
		  	  	
		  	  	CustomMailer.review_liked_by_user(params).deliver
	  			render json: {vote_id: false}
	  		else 

	  			render json: {vote_id: @vote.id}

	  		end
  	end
  	
  	
  	def destroy
	  	Vote.destroy(params[:id])
	  	respond_with({:msg => "DELETE"}, :status => 202)
	end
	
	
	def show
		@response =  Vote.create(params[:id])
		
		respond_width({:msg => "GET"}, :status => 200)
	end
	
	
	  private
	  def vote_params
	    params.require(:vote).permit(:user_id, :review_id)
	  end
end


