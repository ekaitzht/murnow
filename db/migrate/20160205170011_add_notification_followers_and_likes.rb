class AddNotificationFollowersAndLikes < ActiveRecord::Migration
  def change
	  add_column :users, :notification_followers, :boolean, :default => true
	  add_column :users, :notification_likes, :boolean, :default => true
  end
end
