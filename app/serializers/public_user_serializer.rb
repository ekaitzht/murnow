class PublicUserSerializer < ActiveModel::Serializer
	self.root = false
	attributes  :id,:age,:eye_color, :bio, :favourite_brand, :hash_url_image, :skin_tone, :skin_type, :username,:following
	  
	  
	def following
	    collection = object.active_relationships.to_a
	    { count: collection_length }
	end
	
	
end


