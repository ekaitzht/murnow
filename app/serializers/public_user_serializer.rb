class PublicUserSerializer < ActiveModel::Serializer
	self.root = false
	  attributes  :id,:age, :bio, :favourite_brand, :image, :skin_color, :skin_tone, :skin_type, :username
	  
	  has_many :reviews,  serializer: UserProfileReviewsSerializer
end



