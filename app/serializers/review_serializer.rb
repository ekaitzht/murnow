class ReviewSerializer < ActiveModel::Serializer
	  attributes  :id, :body
	  	  
	  has_one :user,  serializer: UserReviewSerializer
	  has_many :votes
	  
end

