require 'elasticsearch/model'

class Product < ActiveRecord::Base
  has_many :reviews

  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks



  settings index: { 
	number_of_shards: 1,
	analysis: {
      analyzer: {
        folding_analyzer: {
          tokenizer: "standard",
          filter: ["standard", "lowercase", "asciifolding"]
        }
      }
    }
  } do
    mappings dynamic: 'false' do
      indexes :product_name, analyzer: 'folding_analyzer', index_options: 'offsets'
      indexes :brand_name, analyzer: 'folding_analyzer', index_options: 'offsets'
      indexes :rating, analyzer: 'folding_analyzer', index_options: 'offsets'
      indexes :category, analyzer: 'standard', index_options: 'offsets'
      indexes :tags, analyzer: 'standard', index_options: 'offsets'

    end
  end

  
=begin
  def as_json(options = {})
   super(options.merge(include: {reviews:
    {include: [:user,:votes]}
    }))
  end 
=end

  def self.autocomplete_search(query)
    __elasticsearch__.search(
	     _source:  ['id','product_name', 'brand_name', 'upvotes','hash_url_image','product_stars','buyers','not_buyers','rating'],
     query: { 
	  	match_phrase_prefix: {
                    product_name: query
                }
  	  }  )
  end

  def self.search(query, from)
    __elasticsearch__.search(
      {
        _source:  ['id','product_name', 'brand_name', 'upvotes','hash_url_image','product_stars','buyers','not_buyers','rating'],
        query: {
          multi_match: {
            query: query,
            # Here you can add what search field can be matcheables
            fields: ['product_name^2','brand_name', 'category','tags'] 
          }
        },
        sort: [{rating: {order: 'desc'}}],
        from: from, size: 20
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
