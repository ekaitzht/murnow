class CreateSkinProblems < ActiveRecord::Migration
  def change
    create_table :skin_problems do |t|
      t.string :name, index: true
      t.timestamps
    end
    # If you don't want id  create_table :user_skin_problems, id: false do |t|
    create_table :user_skin_problems do |t|
      t.belongs_to :user, index: true
      t.belongs_to :skin_problem, index: true
    end
  end  
  def up
    execute "ALTER TABLE user_skin_problems ADD PRIMARY KEY (user_id,skin_problem_id);"
  end
  def down
   execute "ALTER TABLE user_skin_problems DROP CONSTRAINT  IF EXISTS   user_skin_problems_pkey "
  end
end

