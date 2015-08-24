class AddUniqueProductNameToProducts < ActiveRecord::Migration
  def change
	      add_index :products, :product_name, unique: true
  end
end
