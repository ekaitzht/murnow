class AddSocialLinksToUsers < ActiveRecord::Migration
  def change
		add_column :users, :instagram_profile, :string
		add_column :users, :youtube_channel, :string
	
  end
end
