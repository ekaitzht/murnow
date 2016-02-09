class Api::RelationshipsController < ApplicationController
  before_filter :authenticate_user!, :only => [:create, :destroy, :am_i_following_this_user]

  def create
    userfollowed = User.find(params[:followed_id])
    userfollowed.increment!(:followers_count)
    current_user.increment!(:following_count)
    current_user.follow(userfollowed) # we need to check if this gives a error and return 200 or 500
    
    
    
    
    
    
    
    
    #Preparing parameters for email
    params['email_to'] = userfollowed.email
	params['username_gives_follow'] = current_user.username
	params['username_receives_follow'] = userfollowed.username
	params['user_id_gives_follow'] = current_user.id
	params['bio'] = current_user.bio
	params['followers_count'] = current_user.followers_count
	params['following_count'] = current_user.following_count
	
	if current_user.hash_url_image.empty?  then
		params['url_image_profile'] = '/assets/anonymousUser.png'
		
	else
		params['url_image_profile'] = 'https://' + ENV['CDN_DOMAIN_NAME'].to_s + '/profile_images_'+  Rails.env.to_s  + '/' + current_user.hash_url_image.to_s
	end	  	  	
		  	  	
    
    
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




