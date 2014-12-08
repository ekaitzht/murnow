class NewValidationsToProducts < ActiveRecord::Migration
  def change
  	change_column_null :products, :product_name, :null => false
  	change_column_null :products, :brand_name, :null => false
  	change_column_null :products, :category, :null => false
  	change_column_null :products, :product_id, :null => false
  	change_column_null :products, :sku_code, :null => false
  	change_column_null :products, :image_url, :null => false
  	change_column_null :products, :hash_url_image, :null => false

  	change_column_default :products, :upvotes, 0

  	change_column :products, :sku_currency, :string

  	add_column :products, :sku_price, :numeric
  end
end
