class AddBuyersToProducts < ActiveRecord::Migration
  def change
    add_column :products, :buyers, :integer, :default => 0
  end
end
