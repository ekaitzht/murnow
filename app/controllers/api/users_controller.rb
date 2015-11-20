class Api::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    respond_with  @user, serializer: PublicUserSerializer;
  end
end