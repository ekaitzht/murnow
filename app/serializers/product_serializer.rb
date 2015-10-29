class ProductSerializer < ActiveModel::Serializer
	  attributes :id, :product_name, :upvotes, :hash_url_image, :buyers, :not_buyers, :product_stars, :brand_name, :category, :rating,:number_reviews, :original_url
	  
	  has_many :reviews
end