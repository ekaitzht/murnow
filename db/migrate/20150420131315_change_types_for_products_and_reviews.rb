class ChangeTypesForProductsAndReviews < ActiveRecord::Migration
  def change
	   change_column :reviews, :stars, :float
	   change_column :products, :product_stars, :float
  end
end
