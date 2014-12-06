class AddMultipleColumnsToProducts < ActiveRecord::Migration
  def change
  	    add_column :products, :brand_name, :string
  	    add_column :products, :category, :string
  	    add_column :products, :long_product_description, :text
  	    add_column :products, :product_id, :string
  	    add_column :products, :sku_label, :string
  	    add_column :products, :sku_code, :string
  	    add_column :products, :size_label, :string
  	    add_column :products, :size_value, :string
  	    add_column :products, :sku_currency, :decimal
  	    add_column :products, :product_stars, :decimal, :default => 0
  	    add_column :products, :number_reviews, :integer, :default => 0
  	    add_column :products, :image_url, :string
  	    add_column :products, :hash_url_image, :string
  	    add_column :products, :long_description, :text
  end
end
