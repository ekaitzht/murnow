require 'elasticsearch/model'

class Product < ActiveRecord::Base
  has_many :reviews

  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks



  settings index: { number_of_shards: 1 } do
    mappings dynamic: 'false' do
      indexes :long_description, analyzer: 'english', index_options: 'offsets'
      indexes :product_name, analyzer: 'english', index_options: 'offsets'
      indexes :brand_name, analyzer: 'english', index_options: 'offsets'
      indexes :rating, analyzer: 'english', index_options: 'offsets'
    end
  end

  
=begin
  def as_json(options = {})
   super(options.merge(include: {reviews:
    {include: [:user,:votes]}
    }))
  end 
=end

  def self.search(query, from)
    __elasticsearch__.search(
      {
        _source:  ['id','product_name', 'brand_name', 'upvotes','hash_url_image','product_stars','buyers','not_buyers','rating'],
        query: {
          multi_match: {
            query: query,
            # Here you can add what search field can be matcheables
            fields: ['product_name','long_description','brand_name'] 
          }
        },
        sort: [{rating: {order: 'desc'}}],
        from: from, size: 40
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
