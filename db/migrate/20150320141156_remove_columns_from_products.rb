class RemoveColumnsFromProducts < ActiveRecord::Migration
  def change
  	  remove_column :products, :long_product_description
	  remove_column :products, :product_id
	  remove_column :products, :sku_label
	  remove_column :products, :sku_code
	  remove_column :products, :size_label
	  remove_column :products, :size_value
	  remove_column :products, :sku_currency
	  remove_column :products, :image_url
	  add_column :products, :ref_elastic, :string
  end
end
