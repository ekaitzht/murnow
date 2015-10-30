class AddBitToRemoveProducts < ActiveRecord::Migration
  def change
	    	add_column :products, :bit_to_remove, :boolean, :default => true
			add_column :products, :levels, :string

  end
end
