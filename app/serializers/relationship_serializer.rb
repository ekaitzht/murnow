class RelationshipSerializer < ActiveModel::Serializer
	self.root = false
	attributes  :id,:follower_id, :followed_id
	  

	 

end


