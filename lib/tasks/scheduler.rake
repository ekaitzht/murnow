namespace :cron do

	desc "This task send new followers and likes during the last week"
	task :send_notifications => :environment do
		ApplicationController.new.set_config_email
		
		
	  	User.find_each do |user|
		  	
		  	#A que usuarios a dado like el usuario "user.id"
		  	sql = "SELECT DISTINCT ON (votes.user_id) votes.user_id AS user_gives_like_id , reviews.user_id, votes.created_at FROM reviews, votes WHERE reviews.id = votes.review_id AND is_liked = true AND reviews.user_id ="+user.id.to_s+" AND votes.user_id <>"+user.id.to_s+"  AND votes.created_at IS NOT NULL;"
			result = ActiveRecord::Base.connection.execute(sql);

			params = Hash.new
			params['users_giving_likes'] = Array.new
			
			# LIKE REPORT!!!!!!
			if user.notification_likes == true then
				result.first(3).each do |row|
					if !row['created_at'].nil? then
						if Date.parse(row['created_at'].to_s ) <= Date.today and Date.parse(row['created_at'].to_s ) >= (Date.today - 7.days)
								
								users_giving_likes = User.find_by_id(row['user_gives_like_id'])
								
								if users_giving_likes.hash_url_image.nil?  then
									url_image_profile =	 'http://'+ActionMailer::Base.default_url_options[:host] + '/assets/anonymousUser.png'
									
								else
								
								
									url_image_profile = 'https://' + ENV['CDN_DOMAIN_NAME'].to_s + '/profile_images_'+  Rails.env.to_s  + '/' + users_giving_likes.hash_url_image.to_s
								end	  	  	
								
							params['users_giving_likes'] << { 
								username: users_giving_likes.username, 
								id: users_giving_likes.id, 
								following_count: users_giving_likes.following_count,
								followers_count: users_giving_likes.followers_count,
								bio: users_giving_likes.bio,
								url_image_profile: url_image_profile								
								}
								
								
								
							params['email_to'] = user.email
							params['user_username_report'] = user.username
							params['user_id_report'] = user.id
						else
						
						end	
					end
				end
				# We don't have any user in users_array_name we don't send the email
				if !params['users_giving_likes'].empty?
					CustomMailer.likes_report(params).deliver
					print params
					puts "SENDING LIKE REPORT --->"+ user.email.to_s
				else
				end
				
			end
			
			
			
			
			# FOLLOWER REPORT!!!!!!
			if user.notification_followers == true then

				params = Hash.new
				params['followers'] = Array.new

				user.followers.first(3).each do |follower|
					
					result = ActiveRecord::Base.connection.execute("SELECT created_at FROM  relationships WHERE relationships.followed_id = "+user.id.to_s+" AND relationships.follower_id = "+follower.id.to_s+";");
					
					created_at = result[0]['created_at']
					if Date.parse(created_at) <= Date.today and Date.parse(created_at) >= (Date.today - 7.days) then
						
						
						if follower.hash_url_image.nil?  then
							url_image_profile =	 'http://'+ActionMailer::Base.default_url_options[:host] + '/assets/anonymousUser.png'
						else
							url_image_profile = 'https://' + ENV['CDN_DOMAIN_NAME'].to_s + '/profile_images_'+  Rails.env.to_s  + '/' + follower.hash_url_image.to_s
						end
								
								
						params['followers'] << { 
							username: follower.username, 
							id: follower.id,
							following_count: follower.following.count,
							followers_count: follower.followers_count,
							bio: follower.bio,
							url_image_profile: url_image_profile
							
						}
						
						params['email_to'] = user.email
						params['user_username_report'] = user.username
						
							
					else
					
					end
					
				end
				# We don't have any user in users_array_name we don't send the email
				if params.has_key?('followers')
					if !params['followers'].empty?
						CustomMailer.followers_report(params).deliver
						print params
						puts "SENDING FOLLOWERS REPORT --->"+ user.email.to_s
					else 

					end
				end
			end
			
			
			
		end
	end
	
	
	task :reset_reviews => :environment do
		Product.find_each do |product|
			if product.number_reviews > 0 # we have reviews in the system
				total_sum = 0
				n = 0
				average_product_stars = 0
				buyers = 0 
				not_buyers = 0
				
				Review.where(product_id: product.id).find_each do |review|
					total_sum = total_sum + review.stars
					
					if review.repurchase == true 
						buyers = buyers + 1
					else
						not_buyers = not_buyers + 1 
					end
					n = n + 1
				end
				

				if n == 0 
					product.number_reviews = 0
					product.sum_rating = product.product_stars.to_f * (product.buyers.to_f + product.not_buyers.to_f)

				else 
					average_product_stars = total_sum/n
					product.sum_rating = total_sum

					product.buyers = buyers
					product.not_buyers = not_buyers
					product.product_stars = average_product_stars
				end

				rating = (product.buyers.to_f/(product.buyers.to_f + product.not_buyers.to_f))*100
				product.rating = rating	
				product.save!
			elsif product.number_reviews == 0 # we don't have reviews in the system
				
				if product.product_stars = "Infinity"
					product.product_stars = 4.5;
				end
				
				product.sum_rating = product.product_stars.to_f * (product.buyers.to_f + product.not_buyers.to_f)
				product.save
			end
		end
	end	

end


