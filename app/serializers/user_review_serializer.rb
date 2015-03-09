class UserReviewSerializer < ActiveModel::Serializer
	  attributes  :id,:age, :bio, :favourite_brand, :image, :skin_color, :skin_tone, :skin_type
	  
	  has_many :votes
end



