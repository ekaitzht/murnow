class AddColumnsToUser < ActiveRecord::Migration
  def change
    add_column :users, :bio, :text
    add_column :users, :age, :integer
    add_column :users, :skin_type, :string
    add_column :users, :skin_color, :string
    add_column :users, :skin_problems, :string
    add_column :users, :favourite_brand, :string
  end
end
