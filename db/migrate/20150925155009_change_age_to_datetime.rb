class ChangeAgeToDatetime < ActiveRecord::Migration
  def change
	  remove_column :users, :age
	  add_column :users, :age, :datetime
  end
end
