class ProductSerializer < ActiveModel::Serializer
	  attributes :id, :product_name, :upvotes, :hash_url_image, :buyers, :not_buyers, :product_stars, :brand_name, :category, :rating
	  
	  has_many :reviews
end