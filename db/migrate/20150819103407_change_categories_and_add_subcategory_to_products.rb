class ChangeCategoriesAndAddSubcategoryToProducts < ActiveRecord::Migration
  def change
	  	      add_column :products, :subcategory, :string
	  	      rename_column :products, :categories, :category
  end
end
