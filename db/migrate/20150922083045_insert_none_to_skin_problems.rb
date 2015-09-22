class InsertNoneToSkinProblems < ActiveRecord::Migration
  def up
	  
	  execute "INSERT INTO skin_problems (name, created_at, updated_at) values ('none', now(), now());"

  end
  
  def down
     execute "DELETE FROM skin_problems WHERE name = 'none';"

  end
end
