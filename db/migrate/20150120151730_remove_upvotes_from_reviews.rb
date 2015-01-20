class RemoveUpvotesFromReviews < ActiveRecord::Migration
  def change
  	remove_column :reviews, :upvotes
  end
end
