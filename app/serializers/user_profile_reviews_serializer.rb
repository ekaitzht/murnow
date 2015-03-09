class UserProfileReviewsSerializer < ActiveModel::Serializer
	  attributes  :id, :body, :stars, :created_at, :product_id
	  has_many :votes
	  has_one :product,  serializer: ProductPreviewPublicProfileSerializer

end
