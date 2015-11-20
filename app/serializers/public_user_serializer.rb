class PublicUserSerializer < ActiveModel::Serializer
	self.root = false
	attributes  :id,:age,:eye_color, :bio, :favourite_brand, :hash_url_image, :skin_tone, :skin_type, :username,:following_count, :followers_count
	  
	  
	def following_count
	    collection = object.active_relationships.to_a
	    return collection.length 
	end
	
	
	def followers_count
	    collection = object.passive_relationships.to_a
	    return collection.length 
	end
	
end


