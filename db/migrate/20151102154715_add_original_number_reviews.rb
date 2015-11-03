class AddOriginalNumberReviews < ActiveRecord::Migration
  def change
		add_column :products, :original_number_reviews, :integer
  end
end
