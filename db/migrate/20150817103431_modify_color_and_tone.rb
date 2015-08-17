class ModifyColorAndTone < ActiveRecord::Migration
  def change
	  
	  remove_column :users,:skin_color
	  

  end
end
