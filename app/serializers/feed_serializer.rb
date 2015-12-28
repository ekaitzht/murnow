class FeedSerializer < ActiveModel::Serializer

	 attributes  :username,:user_id, :body, :stars,:repurchase, :created_at, :id, :product
	 
	 has_one :user
	 has_one :product

end



