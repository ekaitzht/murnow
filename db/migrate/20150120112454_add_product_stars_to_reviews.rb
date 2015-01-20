class AddProductStarsToReviews < ActiveRecord::Migration
  def change
    add_column :reviews, :stars, :integer, null: false
  end
end
