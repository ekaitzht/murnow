class AddUniqueForProductIdUserId < ActiveRecord::Migration
  def change
	    add_index :reviews, [:product_id, :user_id], :unique => true
  end
end
