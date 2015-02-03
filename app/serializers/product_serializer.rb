class ProductSerializer < ActiveModel::Serializer
	  attributes :id, :product_name, :upvotes, :product_id, :hash_url_image, :buyers, :not_buyers
	  
	  has_many :reviews
end