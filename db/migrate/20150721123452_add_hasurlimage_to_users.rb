class AddHasurlimageToUsers < ActiveRecord::Migration
  def change
	 	remove_column :users,:image
	    add_column :users, :hash_url_image, :string   
  end
end
