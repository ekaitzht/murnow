class ProductPreviewSerializer < ActiveModel::Serializer
	  attributes  :product_name, :hash_url_image, :brand_name
end