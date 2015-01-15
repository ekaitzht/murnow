class SkinProblem < ActiveRecord::Base
	has_many :user_skin_problems
	has_many :users, :through => :user_skin_problems
end
