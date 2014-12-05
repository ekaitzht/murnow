class AddDefaultValueToUpvotesAttribute < ActiveRecord::Migration
  def change
  	change_column :reviews, :upvotes, :integer, :default => 0
  end
end
