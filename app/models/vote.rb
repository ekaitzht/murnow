class Vote < ActiveRecord::Base
	belongs_to :review
	belongs_to :user
	validates_uniqueness_of :user_id, :scope => :review_id, :case_sensitive => false

end
