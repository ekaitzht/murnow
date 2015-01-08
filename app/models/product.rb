require 'elasticsearch/model'

class Product < ActiveRecord::Base
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks

  settings index: { number_of_shards: 1 } do
    mappings dynamic: 'false' do
      indexes :long_description, analyzer: 'english', index_options: 'offsets'
      indexes :long_product_description, analyzer: 'english', index_options: 'offsets'
      indexes :product_name, analyzer: 'english', index_options: 'offsets'
    end
  end

  has_many :reviews

  def as_json(options = {})
   super(options.merge(include: [:reviews, reviews: {include: :user}]))
  end

  def self.search(query)
    __elasticsearch__.search(
      {
        _source:  ['id','product_name', 'brand_name', 'category', 'upvotes','long_description','hash_url_image'],
        query: {
          multi_match: {
            query: query,
            # Here you can add what search field can be matcheables
            fields: ['product_name^10', 'long_product_description','long_description'] 
          }
        },
        from: 0, size: 1000
      }
    )
  end


end


# Delete the previous Products index in Elasticsearch
Product.__elasticsearch__.client.indices.delete index: Product.index_name rescue nil
 
# Create the new index with the new mapping
Product.__elasticsearch__.client.indices.create \
  index: Product.index_name,
  body: { settings: Product.settings.to_hash, mappings: Product.mappings.to_hash }
 

 

# Index all Product records from the DB to Elasticsearch
Product.import
