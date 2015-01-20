class AddNotBuyersToProducts < ActiveRecord::Migration
  def change
    add_column :products, :not_buyers, :integer , :default => 0
  end
end
