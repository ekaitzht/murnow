class Api::RelationshipsController < ApplicationController
  before_filter :authenticate_user!, :only => [:create, :destroy]

  def create
    userfollowed = User.find(params[:followed_id])
    userfollowed.increment!(:followers_count)
    current_user.increment!(:following_count)
    current_user.follow(userfollowed) # we need to check if this gives a error and return 200 or 500
	respond_with({:status => 200}, :location => nil)
  end

  def destroy
    userfollowed = Relationship.find(params[:id]).followed
    userfollowed.decrement!(:followers_count)
    current_user.derement!(:following_count)
    current_user.unfollow(current_user) # we need to check if this gives a error and return 200 or 500
	respond_with({:status => 200}, :location => nil)
  end
end


