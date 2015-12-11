class Api::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    
    

    respond_with  @user, serializer: PublicUserSerializer, current_user: current_user, public_user: @user
  end
  
  
   def following
    @user  = User.find(params[:id])
    respond_with @user.following, each_serializer: ProfileFollowingSerializer
  end

  def followers
    @user  = User.find(params[:id])
    respond_with @user.followers, each_serializer: ProfileFollowingSerializer
  end
  
  
  def feed
	  
	  @user  = User.find(params[:id])
	  @reviews = []
	  @user.following.each{ | user_following|
		  
		  logger.info user_following
		   @reviews.concat(Review.where(user_id: user_following.id))
		  
	  }
      respond_with @reviews, each_serializer: ReviewSerializer

  end
  
  
end


