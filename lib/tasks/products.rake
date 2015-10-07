
namespace :products do
	task :load => :environment do
		
		
		def encodeUTF8(string)
			return string.encode('utf-8')
		end
		
		def curateBrand(source)
			if  source.has_key?('brand')
				return source['brand']
		    elsif source['brand'] == 'mac'
		         return 'MAC'
		    end
		end
		
		def curateNameProduct(source)
		    if  source.has_key?('rename')
		        product_name = encodeUTF8(source['rename']) 
		    else
		        product_name = encodeUTF8(source['name'])
				return product_name
			end 
		end
		
		def curateDetails(source)  # Remember that a Ruby method by default will return the value in its final line
			source.has_key?('details') ? source['details'] : nil
		end

		def curateDetails(source)  # Remember that a Ruby method by default will return the value in its final line
			source.has_key?('details') ? source['details'] : nil 
		end
		
		def curateSKU(source)
			source.has_key?('sku') ? encodeUTF8(source['sku']) : nil 
		end
		
		def curateCategories(source)
			source.has_key?('categories') ? encodeUTF8(source['categories']) : nil 
		end
		
		def curateTags(source)
			source.has_key?('tags') ? encodeUTF8(source['tags']) : nil 
		end
		
		def curateRefElastic(source)
		     
            if  source.has_key?('_id')
                return source['_id']['$oid']
            else
                #If we don't ahve $oid we assume that this is a wrong document
                
            
				puts 'Not available $oid next iteration()'
				raise 'exception next iteration'                
            end    
               	
		end
		
		def addFileToS3( file_name, file)
			
			@s3.put_object(bucket: 'murnow', key:"images_products/"+file_name + ".jpg", body: file)
		end
		
		def processImageUrl(image_url, name, prod_id, url_product)
			hash_url_image = Digest::SHA256.hexdigest(image_url) 


			# I think we can find a more efficient function to find the key object. Perhaps we can get all list of objects and implemen a search functionality locally
			#object = @s3.get_object(bucket: 'murnow', key: "images_products/"+hash_url_image + ".jpg") 
			
			if not @selectedKeys.include?("images_products/"+hash_url_image + ".jpg")
				puts 'Not found key: '+hash_url_image+ ', prod_id:'+ prod_id +', name: '+ name +', url_product: '+ url_product
				
				#addFileToS3( hash_url_image , open(image_url).read)
				return image_url
			else 
				#puts "Found key: "+hash_url_image
				return image_url
			end
			
			
		end
		
		def createProductObject(source)
			
			product = Product.new
			product.brand_name = curateBrand(source)
			product.product_name = curateNameProduct(source)
		    product.long_description = curateDetails(source)
		    product.sku = curateSKU(source)
		    product.category = curateCategories(source)
			product.tags = curateTags(source)
	        product.prod_id = source['id']
		    product.retailer = source['retailer']
		    product.product_stars = source['summary']['average']
		    product.hash_url_image = processImageUrl(source['img'],product.product_name,  product.prod_id, source['url'])
			product.buyers = product.product_stars*10
			product.ref_elastic = curateRefElastic(source)
			
            product.not_buyers = 50 - product.buyers
            product.rating = (product.buyers/(product.buyers + product.not_buyers))*100

			return product
		end
				
		###################### MAIN FUNCTION ######################
		
        #Launch this task with  heroku local worker  
        
        
        ###########################################################
        
        
		client = Elasticsearch::Client.new url: ENV['ELASTIC_RAW_DATA']
		
		@s3 = Aws::S3::Client.new() # CREDENTIALS ARE IN .env file 	
		
		print "Excuting elastisearch query... wait please."
		
		response = client.search index: 'macindex', body: 
				{	query: {
		        		filtered: {
					
				            query:{
				                bool:{
				                    should: [       
				                      {bool: {
				                           	must_not:
				                                [
				                                  {terms: {brand: [ 'lit','cosmetics' ],minimum_should_match: 2}},
				                                  {terms: {brand: [ 'amazing','cosmetics' ],minimum_should_match: 2}},
				                                  {terms: {brand: [ 'bareminerals' ]}},
				                                  {terms: {brand: [ 'benefit','cosmetics' ],minimum_should_match: 2}},
				                                  {terms: {brand: [ 'butter','london' ],minimum_should_match: 2}},
				                                  {terms: {brand: [ 'clarins' ]}},
				                                  {terms: {brand: [ 'lancôme' ]}},
				                                  {terms: {brand: [ 'tweezerman' ]}},
				                                  {terms: {brand: [ 'urban','decay' ],minimum_should_match: 2}}
				        
				        
				                                ],
				                            must:{
				                                term: {retailer: "sephora"}    
				                            }
				                         }
				                      },
				                      {bool: {
				                            must_not:
				                               [
				                                 {terms: {brand: [ 'smashbox' ]}},
				                                 {terms: {brand: [ 'algenist' ]}},
				                                 {terms: {brand: [ 'anastasia','beverly','hills' ],minimum_should_match: 3}},
				                                 {terms: {brand: [ 'becca' ]}},
				                                 {terms: {brand: [ 'bliss' ]}},
				                                 {terms: {brand: [ 'dr','brandt' ],minimum_should_match: 2}},
				                                 {terms: {brand: [ 'eyeko' ]}},
				                                 {terms: {brand: [ 'murad' ]}},
				                                 {terms: {brand: [ 'stila' ]}},
				                                 {terms: {brand: [ 'tarte' ]}},                                 
				                                 {terms: {brand: [ 'too','faced' ],minimum_should_match: 2}}
				        
				                                ],
				                            must:{
				                                term: {retailer: "ulta"}    
				                            }
				                         }
				                      },
				                      {bool: {
				                            must_not: [
				        
				                                 {terms: {levels: [ 'brushes','tools' ],minimum_should_match: 2}},
				                                 {terms: {levels: [ 'fragrance' ],minimum_should_match: 1}},
				                                                                          
				                                                                          {terms: {levels: [ 'removers' ],minimum_should_match: 1}},
				                                                                          {terms: {levels: [ 'moisturizers' ],minimum_should_match: 1}}
				        
				        
				                                ],
				                            must:{
				                                term: {retailer: "mac"}    
				                            }
				                         }
				                      }        
				                    ]
				                 }
				            },
				            filter:{
				                bool: {
				                    must: [
				                         {exists: {field:"img"}}, 
				                         {exists: {field:"summary.average"}}
				                    ]
				                }    
				            }
				        }
					},
					size: 50000
				}
				
				
		resourceS3 = Aws::S3::Resource.new
		bucket = resourceS3.bucket('murnow')
		
		
		@selectedKeys = Array.new
		bucket.objects.each do |obj|
			@selectedKeys.push(obj.key)
		end
		

		puts "Elastisearch Query executed"

		response['hits']['hits'].each { |document|
			product = createProductObject(document['_source'])	
			

			productDB = Product.where("retailer = ? AND prod_id = ?",product.retailer, product.prod_id).limit(1)
			#puts productDB
			
			#if productDB.nil?
			#	productToUpdate = Product.find_by_id(productDB.id)
			#	productToUpdate.update()
			#else 
			#	product.save
			#end
		}
	end
end

