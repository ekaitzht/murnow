class AddSkuidAndProdIdToProducts < ActiveRecord::Migration
  def change
	    add_column :products, :sku, :string
	    add_column :products, :prod_id, :string
		add_column :products, :retailer, :string

  end
end
