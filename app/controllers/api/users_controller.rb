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
  
  
end


