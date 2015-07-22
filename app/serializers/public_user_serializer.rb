class PublicUserSerializer < ActiveModel::Serializer
	self.root = false
	  attributes  :id,:age, :bio, :favourite_brand, :hash_url_image, :skin_color, :skin_tone, :skin_type, :username
	  
	  has_many :reviews,  serializer: ReviewSerializer
end


