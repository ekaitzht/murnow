class UserSkinProblem < ActiveRecord::Base
	belongs_to :user
	belongs_to :skin_problem
	validates_uniqueness_of :user_id, :scope => :skin_problem_id, :case_sensitive => false
end
