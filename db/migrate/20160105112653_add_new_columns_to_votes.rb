class AddNewColumnsToVotes < ActiveRecord::Migration
  def change
		add_column :votes, :is_sent, :boolean, :default => false
		add_column :votes, :is_liked, :boolean, :default => true
		add_column :votes, :created_at, :datetime
		add_column :votes, :updated_at, :datetime
			
	  
  end
end
