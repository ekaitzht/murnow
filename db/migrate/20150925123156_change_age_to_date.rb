class ChangeAgeToDate < ActiveRecord::Migration
  def up
	   execute "UPDATE FROM users SET age = null;"
	  change_column :reviews, :body, :date
	  
  end
end
