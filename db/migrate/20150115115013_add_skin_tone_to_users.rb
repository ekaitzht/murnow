class AddSkinToneToUsers < ActiveRecord::Migration
  def change
    add_column :users, :skin_tone, :string
    remove_column :users, :skin_problems, :string
  end
end
