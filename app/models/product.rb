class Product < ActiveRecord::Base
	  has_many :reviews
	  def as_json(options = {})
    	super(options.merge(include: :reviews))
   	  end
end
