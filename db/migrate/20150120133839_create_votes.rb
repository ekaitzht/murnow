class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.belongs_to :user, index: true
      t.belongs_to :review, index: true
    end
    add_index :votes, [:user_id, :review_id], :unique => true
  end
end