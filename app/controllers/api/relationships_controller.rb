class Api::RelationshipsController < ApplicationController
  before_filter :authenticate_user!, :only => [:create, :destroy, :am_i_following_this_user]

  def create
    userfollowed = User.find(params[:followed_id])
    userfollowed.increment!(:followers_count)
    current_user.increment!(:following_count)
    current_user.follow(userfollowed) # we need to check if this gives a error and return 200 or 500
	respond_with({:status => 200}, :location => nil)
  end

  def destroy
    userfollowed = User.find_by_id(params[:followed_id])
    userfollowed.decrement!(:followers_count)
    current_user.decrement!(:following_count)
    current_user.unfollow(userfollowed) # we need to check if this gives a error and return 200 or 500
	respond_with({:status => 200}, :location => nil)
  end
    
end

