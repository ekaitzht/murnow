class ReviewSerializer < ActiveModel::Serializer
	  attributes  :id, :body, :user_id, :stars, :created_at
	  	  
	  has_one :user,  serializer: UserReviewSerializer
	  has_many :votes
	  
end

