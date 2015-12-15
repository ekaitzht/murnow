class PublicUserSerializer < ActiveModel::Serializer
	self.root = false
	attributes  :id,:age,:eye_color, :bio, :favourite_brand, :hash_url_image, :skin_tone, :skin_type, :username,:following_count, :followers_count,:am_i_following_this_user
	  
	  
	def following_count
	    collection = object.active_relationships.to_a
	    return collection.length 
	end
	
	
	def followers_count
	    collection = object.passive_relationships.to_a
	    return collection.length 
	end
	
	
	# This function checks if a user has a relationship between both users.
	def am_i_following_this_user
	  if  serialization_options[:current_user].active_relationships.find_by(followed_id: serialization_options[:public_user].id).present?
		  return true
      else 
      	  return false
      end
  	end 
end




