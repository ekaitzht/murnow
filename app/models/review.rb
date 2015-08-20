class Review < ActiveRecord::Base
  belongs_to :product
  belongs_to :user
  has_many :votes
  has_many :users, :through => :votes

  validates_uniqueness_of :user_id, :scope => :product_id
  validates :body, :length => { :maximum => 1000 }
  validates :repurchase, :inclusion => { :in => [true, false] }
  validates :stars ,:numericality => true
 
 
 
=begin
  def as_json(options = {})
    super(options.merge(include: :user))
  end
=end
  
  
end
