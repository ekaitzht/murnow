class UsersController < ApplicationController
  #before_filter :authenticate_user!, :only => [:create, :destroy]

  def create
    userfollowed = User.find(params[:followed_id])
    userfollowed.increment!(:followers)
    current_user.increment!(:following)
    current_user.follow(userfollowed)
  end

  def destroy
    userfollowed = Relationship.find(params[:id]).followed
    userfollowed.decrement!(:followers)
    current_user.derement!(:following)
    current_user.unfollow(current_user)
  end
end


