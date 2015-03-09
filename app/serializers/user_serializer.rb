class UserSerializer < ActiveModel::Serializer
	  attributes  :id,:age, :bio, :favourite_brand, :image, :skin_color, :skin_tone, :skin_type
	  
	  has_many :reviews,  serializer: UserProfileReviewsSerializer

end



