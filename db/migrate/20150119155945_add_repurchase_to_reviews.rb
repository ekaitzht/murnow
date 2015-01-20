class AddRepurchaseToReviews < ActiveRecord::Migration
  def change
    add_column :reviews, :repurchase, :boolean, null: false
  end
end
