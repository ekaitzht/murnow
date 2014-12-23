class AddNotNullToUsernameColumn < ActiveRecord::Migration
  def change
  	change_column_null :users, :username, false

  end
end
 