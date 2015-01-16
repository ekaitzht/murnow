class AddUniqueNameToSkinProblems < ActiveRecord::Migration
  def change
  	add_index :skin_problems, :name, :unique => true
    

  end
end
