class AddEyeColorColumnToUser < ActiveRecord::Migration
  def change
	      add_column :users, :eye_color, :string

	  
  end
end
