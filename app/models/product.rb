require 'elasticsearch/model'

class Product < ActiveRecord::Base
  #extend FriendlyId
  #friendly_id :product_name, use: :slugged
  has_many :reviews
  validates :brand_name, :exclusion=> { :in => ["Lit Cosmetics", "Amazing Cosmetics","bareMinerals","Benefit Cosmetics","butter LONDON","Clarins","Lancôme","Tweezerman","Urban Decay" ] }, if: lambda { |o| o.retailer != 'sephora' }
 validates :brand_name, :exclusion=> { :in => ["Smashbox", "Algenist","Anastasia Beverly Hills","BECCA", "Bliss","Dr. Brandt","Eyeko","Murad","Stila","Tarte","Too Faced"] }, if: lambda { |o| o.retailer != 'ulta' } 
  
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks



  settings index: { 
	number_of_shards: 1,
	number_of_replicas: 0,
	analysis: {
      	analyzer: {
        	folding_analyzer: {
          	tokenizer: "standard",
          	filter: ["standard", "lowercase", "asciifolding","my_synonym"]
        	}
      	},
        filter: {
      		my_synonym: {
				type: "synonym",
				expand: true,
				ignore_case: true,
				synonyms: [
					"eye shadow, eyeshadow",
					"pote, foundation, base, fondation",
					"pallette, palete, pallete, palette",
					"mattifying, matte,velvet",
					"oil-free,oil free",
					"moisturizing, moisturising,hydrating",
					"neutral,nude,natural",
					"SPF,UV,sun screen,sun protection,UVA,UVV",
					"long lasting,long wear, long-lasting,long-wear",
					"eye liner,eyeliner",
					"transparent,translucent",
					"stilla,stila",
					"loreal,l'oreal"
					
				]
			}
	    }		
    }
  } do
    mappings dynamic: 'false' do
      indexes :product_name, analyzer: 'folding_analyzer', index_options: 'offsets', norms: {enabled: false}
      indexes :levels, analyzer: 'folding_analyzer', index_options: 'offsets', norms: {enabled: false}
      indexes :brand_name, analyzer: 'folding_analyzer', index_options: 'offsets', norms: {enabled: false}, fields: { raw: { type:'string', index:'not_analyzed'} }
      indexes :original_number_reviews, index: 'not_analyzed', type: 'integer'
      indexes :id, type: 'integer', analyzer: 'standard', index_options: 'docs'
	  indexes :rating, type: 'integer', index: 'not_analyzed'


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
		    _source:  ['id','product_name', 'brand_name', 'upvotes','hash_url_image','product_stars','buyers','not_buyers','rating','original_url','original_number_reviews'],
	    	query: {
			    function_score:{
			        query: {
			          multi_match: {
			            query: query,
			            type: 'cross_fields',
			            # Here you can add what search field can be matcheables
			            fields: ['product_name','brand_name^2', 'levels^3'] 
			          }
			        },
			        functions:[
				        {
					        linear: {
					           original_number_reviews: {
					             origin: "200000",
					              scale: "200000",
					              decay: 0.5
					            }
							}
				        },
				        {
				          filter: { term: { "brand_name.raw": "Z Palette" }}, 
				          weight: 0
				        }
				    ]
			    }
	    	},
	    	from: from, size: 20

	    }
       
    )
  end
  
  
  def self.searchGeneral(elasticsearchJSON)
	__elasticsearch__.search(elasticsearchJSON)  
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
