class FeedSerializer < ActiveModel::Serializer

	 attributes  :username,:user_id, :body, :stars,:repurchase, :created_at, :id, :product
	 
	 belongs_to :user
	 belongs_to :product

end



