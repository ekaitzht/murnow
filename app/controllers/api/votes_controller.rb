class Api::VotesController < ApplicationController
	before_filter :authenticate_user!
  	def create

  	    	@vote_response =  Vote.where(user_id: vote_params[:user_id], review_id: vote_params[:review_id]).take
  			
  			
  			if @vote_response.nil?
	  			@vote =  Vote.create(user_id: vote_params[:user_id], review_id: vote_params[:review_id])
		  		@user_gives_like = User.find_by_id(vote_params[:user_id])
		  	  	@user_receives_like = User.find_by_id(Review.find(vote_params[:review_id]).user_id)
		  	  	@product_reviewed = Product.find_by_id(Review.find(vote_params[:review_id]).product_id)
		  	  	
		  	  	
		  	  	params['email_to'] = @user_receives_like.email
		  	  	params['username_gives_like'] = @user_gives_like.username
		  	  	params['username_receives_like'] = @user_receives_like.username
		  	  	
		  	  	params['product_id'] = @product_reviewed.id
		  	  	params['user_id_gives_like'] = @user_gives_like.id
		  	  	
		  	  	
		  	  	CustomMailer.review_liked_by_user(params).deliver
		  	  		  		ActiveRecord::Base.connection.execute("REFRESH MATERIALIZED VIEW top_reviews;");

	  			respond_with  @vote, :location => nil
	  		else 

	  			respond_with  @vote_response, :location => nil

	  		end
	  		
  	end
  
  	#testing desploy staging
  	def update 
	    @vote = Vote.find_by_id(params[:id])
	    @vote.is_liked = vote_update_params[:is_liked]
		@vote.is_sent = vote_update_params[:is_sent]
		@vote.save!
			  		ActiveRecord::Base.connection.execute("REFRESH MATERIALIZED VIEW top_reviews;");

		respond_with({:msg => "Updated"}, :status => 200)
	end
	

	  private
	  def vote_params
	    params.require(:vote).permit(:user_id, :review_id)
	  end
	  
	  def vote_update_params
		  params.require(:vote).permit(:is_liked, :is_sent)
	  end
end


