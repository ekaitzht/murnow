class ReviewSerializer < ActiveModel::Serializer
	  attributes  :id, :body, :stars, :user_id, :product_id, :created_at, :repurchase
	  	  	
      has_many :votes
      has_one :user, serializer: UserReviewSerializer
      has_one :product, serializer: ProductPreviewSerializer
end

