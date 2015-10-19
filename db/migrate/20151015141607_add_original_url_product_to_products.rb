class AddOriginalUrlProductToProducts < ActiveRecord::Migration
  def change
		add_column :products, :original_url, :string
  end
end
