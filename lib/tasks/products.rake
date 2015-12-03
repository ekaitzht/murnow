
namespace :load do
	
	
		def encodeUTF8(string)
			return string.encode('utf-8')
		end
		
		def curateBrand(source)
			if  source.has_key?('brand_name')
				return source['brand_name']
		    elsif source['brand_name'] == 'mac'
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
                
            
				#puts 'Not available $oid next iteration()'
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
				
				addFileToS3( hash_url_image , open(image_url).read)
				return hash_url_image
			else 
				puts "Found key: "+hash_url_image
				return hash_url_image
			end
			
			
		end
		
	    def removeDuplicatesMac(name)
		    duplicates = ['Chromacake','Extended Play Gigablack Lash','Eye Shadow x 9: Burgundy Times Nine','Eye Shadow x 9: Navy Times Nine','Eye Shadow x 9: Purple Times Nine','Eye Shadow x15: Warm Neutral','Haute & Naughty Too Black Lash','In Extreme Dimension','Lipglass / VIVA GLAM Miley Cyrus','Lipmix / Satin','Lipstick / Brooke Candy','Lipstick / Giambattista Valli','Lipstick / VIVA GLAM Miley Cyrus','Liquid Eye Liner / Brooke Candy','Look In A Box Face Kit/Sophisticate','Look In A Box Lip Kit/Fashion Lover','Look In a Box Lip Kit/Pretty Natural','Mixing Medium Eyeliner','Mixing Medium Gel','Mixing Medium Lash','M·A·CNIFICENT ME! Eye Shadow x 9','PRO Lip Palette / 6 Editorial Oranges','PRO Lip Palette / 6 Editorial Reds','PRO Lip Palette / 6 Preferred Pinks','PRO Lip Palette / 6 Select Plums']
		   
		  
			if /(M·A·C Guo Pei)|(Pro Palette)|(Wash & Dry)|(Sized to Go)|(M·A·C Studio Conceal and Correct Palette)|(Veluxe Pearlfusion Shadow:)/.match(name) or  duplicates.include?(name)
				return true
			end
		end
		
		def removeGeneralDuplicated(  brand, name)
			count = 0
			pos = Array.new
			@response['hits']['hits'].each { |product|
				
				
				if (product['_source']['name'].to_s == name.to_s and product['_source']['brand_name'].to_s == brand.to_s and ['mac', 'sephora', 'ulta'].include?(product['_source']['retailer']))						
					pos  << @response['hits']['hits'].index(product)
					count = count + 1
					
				end
				
					
					
				
				
				
			}
			
			if count >= 2
				#print pos
				
				for i in 1..(pos.length-1) #We remove here all duplicated products but we keep the first
				
					@response['hits']['hits'].delete_at(pos[i])
				end
			end
		
		end





		def createProductObject(source)
			
			product = Hash.new
			product['brand_name'] = curateBrand(source)
			product['product_name'] = curateNameProduct(source)
		    product['long_description'] = curateDetails(source)
		    product['sku'] = curateSKU(source)
		    product['category'] = curateCategories(source)
			product['tags'] = curateTags(source)
	        product['prod_id'] = source['id']
		    product['retailer'] = source['retailer']
		    product['product_stars'] = source['summary']['average']
		    product['hash_url_image'] = processImageUrl(source['img'], product['brand_name'],  product['prod_id'], source['url'])
			product['buyers'] = product['product_stars']*10
			product['ref_elastic'] = curateRefElastic(source)
			
            product['not_buyers'] = 50 - product['buyers']
            product['rating'] = (product['buyers']/(product['buyers'] + product['not_buyers']))*100
			product['original_url'] = source['url']
			product['levels'] =  source['levels'].join(",")
			product['bit_to_remove'] = false;
			product['original_number_reviews'] = source['summary']['reviews']
			return product
		end
				
				
	task :products => :environment do
		
		
		
		###################### MAIN FUNCTION ######################
		
        #Launch this task with  'heroku local load_products', this tasks emulates in locally the heroku server using .env file for config vars.
        
        
        ###########################################################
        
        
		client = Elasticsearch::Client.new url: ENV['ELASTIC_RAW_DATA']
		
		@s3 = Aws::S3::Client.new() # CREDENTIALS ARE IN .env file 	
		
		print "Excuting elastisearch query... wait please."
		
@response = client.search index: 'sephoraindex', body: 
				{	
				    filter:{
				                bool: {
				                    must: [
				                         {exists: {field:"img"}}, 
				                         {exists: {field:"summary.average"}},
				                         {exists: {field:"summary.reviews"}}
				                    ],
				                    should: [       
					                  {bool: {
				                           	must_not: [
					                           	terms: {"brand_name.raw": ["Lit Cosmetics", "Amazing Cosmetics","bareMinerals","Benefit Cosmetics","butter LONDON","Clarins","Lancôme","Tweezerman","Urban Decay" ]}
					                        ],
				                            must:[
				                                {term: {retailer: "sephora"}},
				                                {term: {"levels.raw": "Makeup "}}    
				                            ]
				                         }
				                      }, 
					                   {bool: {
				                            should:[
				                                {bool:{
				                                    must_not:[ 
				                                          {terms: {"brand_name.raw": ["Smashbox", "Algenist","Anastasia Beverly Hills","BECCA", "Bliss","Dr. Brandt","Eyeko","Murad","Stila","Tarte","Too Faced"]}},
				                                          {term: {"levels.raw": "Bags & Cases"}},  
				                                          {term: {"levels.raw": "Travel"}},
				                                          {term: {"levels.raw": "Makeup Gifts"}}
				                                        ],
				                                    must:[
				                                            {term: {"retailer": "ulta"}},                             
				                                            {term: {"levels.raw": "Makeup"}}
				                                        ]
				                                    }
				                                },
				                                {bool:{
				                                    must: [
				                                                  {term: {"levels.raw": "Makeup Gifts"}},
				                                                  {term: {"retailer": "ulta"}},
				                                                  {term: {"brand_name.raw": "Lorac"}}
				                                        ]
				                                    }
				                                }
				                            ]
				
				                         }
                      				    },
				                        {bool: {
				                           	must_not: [
					                           	terms: {"levels.raw": ["Fragance"]}
					                        ],
				                            must:[
				                                {term: {retailer: "mac"}}
				                            ]
				                        }
				                      } 
				                    ]
				                }    
				    },
					size: 8000
		}
				
		puts "Elastisearch Query executed."
		#print @response
		
		resourceS3 = Aws::S3::Resource.new
		bucket = resourceS3.bucket('murnow')
		
		puts "Creating keys."


		@selectedKeys = Array.new
		bucket.objects.each do |obj|
			@selectedKeys.push(obj.key)
		end
		
		puts "Keys created."
		updates = 0
		inserts = 0
		count = 0 
		@response['hits']['hits'].each { |document|

			removeGeneralDuplicated(document['_source']['brand_name'], document['_source']['name'])
			
			if document['_source']['retailer'] ==  'mac' 
				next if removeDuplicatesMac( document['_source']['name'])
			end
			if not /^.*[0-9]{2,3} ?(ml|ML)$/.match(document['_source']['name']).nil? and document['_source']['retailer'] == 'mac'	
				#puts 'hola'
				if count > 0 
					next 
				end
				count = count + 1
				
			end
			
			productHash = createProductObject(document['_source'])	

			
			# this returns array of objects each object represents and row in the database
			response = Product.where("retailer = ? AND prod_id = ?",productHash['retailer'], productHash['prod_id']).limit(1) 			

			if response.empty?
				puts "saving prod_id: "+ productHash['prod_id'].to_s
				Product.new(productHash).save
				inserts = inserts + 1
			else 
				productDB = response.first
				productHash['updated_at'] = DateTime.now  
				productDB.update_attributes(productHash)
				puts "updated prod_id: "+productDB.prod_id.to_s
				updates = updates + 1
			end
		
		}
		
		#User.where(bit_to_remove: true).destroy_all
		puts "Updates: "+ updates.to_s
		puts "Inserts: "+ inserts.to_s
	end
	
	
	
	



	task :product => :environment do
		
		
		###################### MAIN FUNCTION ######################
		
        #Launch this task with  'heroku local load_product', this tasks emulates in locally the heroku server using .env file for config vars.
        #The direct call to rake is in Procfile
        
        ###########################################################
        @s3 = Aws::S3::Client.new()
		
		#puts 'Manual upload product'
		product = Hash.new
		image_url = 'https://www.inglotusa.com/Files/Products/4708_1_36_Thumb.png'
		product['brand_name'] = 'inglot'
		product['product_name'] = 'DURALINE'
	    product['long_description'] = 'Waterless clear liquid that can intensify the color of any powder and transform it into an easy to apply, water resistant liquid.
Hypoallergenic.' 
	    product['sku'] = nil
	    product['category'] = nil
		product['tags'] = nil
        product['prod_id'] = 1144
	    product['retailer'] = 'inglotspain'
	    product['product_stars'] = 4
	    hash_url_image =  Digest::SHA256.hexdigest(image_url) 
	    addFileToS3( hash_url_image , open(image_url).read)
	    product['hash_url_image'] = hash_url_image
		product['buyers'] = product['product_stars']*10
		product['ref_elastic'] = nil
		
        product['not_buyers'] = 50 - product['buyers']
        product['rating'] = (product['buyers']/(product['buyers'] + product['not_buyers']))*100
		product['original_url'] = image_url
		product['levels'] =  'makeup, clear, liquid'
		product['bit_to_remove'] = false;

		
		Product.new(product).save
	end
	
end
