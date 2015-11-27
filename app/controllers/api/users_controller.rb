class Api::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    
    

    respond_with  @user, serializer: PublicUserSerializer, current_user: current_user, public_user: @user
  end
  
  
end


