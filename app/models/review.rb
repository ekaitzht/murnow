class Review < ActiveRecord::Base
  belongs_to :product
  belongs_to :user
  validates_uniqueness_of :user_id, :scope => :product_id


  def as_json(options = {})
    super(options.merge(include: :user))
  end
end
