require 'elasticsearch/model'

class Product < ActiveRecord::Base
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks

  has_many :reviews

  def as_json(options = {})
   super(options.merge(include: [:reviews, reviews: {include: :user}]))
  end

  def self.search(query)
    __elasticsearch__.search(
      {
        query: {
          multi_match: {
            query: query,
            # Here you can add what search field can be matcheables
            fields: ['product_name^10', 'long_product_description'] 
          }
        },
        from: 0, size: 1000
      }
    )
  end


end

Product.import
