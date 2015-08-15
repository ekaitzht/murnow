class AddTagsAndModifyCategoryToProducts < ActiveRecord::Migration
  def change
 	 rename_column :products, :category, :categories	
  	 add_column :products, :tags, :string   
  end
end
