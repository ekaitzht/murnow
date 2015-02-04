class Review < ActiveRecord::Base
  belongs_to :product
  belongs_to :user
  has_many :votes
  has_many :users, :through => :votes

  validates_uniqueness_of :user_id, :scope => :product_id

 def active_model_serializer
      ReviewSerializer
  end

=begin
  def as_json(options = {})
    super(options.merge(include: :user))
  end
=end
  
  
end
