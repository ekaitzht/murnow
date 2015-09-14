class AddUniqueToProductsForProdidRetailer < ActiveRecord::Migration
  def change
	  add_index :products, [:prod_id, :retailer], :unique => true
  end
end
