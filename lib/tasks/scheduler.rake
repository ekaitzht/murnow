namespace :cron do

	desc "This task send new followers and likes during the last week"
	task :send_notifications => :environment do
	  	User.find_each do |user|
		  	
		  	puts "PREPARING EMAILS TO --->"+ user.email.to_s
			result = ActiveRecord::Base.connection.execute("SELECT votes.user_id user_gives_like_id, reviews.user_id, votes.created_at FROM reviews, votes WHERE reviews.id = votes.review_id AND is_liked = true AND reviews.user_id="+user.id.to_s+";");
			
			params = Hash.new
			params['users_array_names'] = Array.new
			
			if user.notification_followers == true then
				result.each do |row|
					if !row['created_at'].nil? then
						if Date.parse(row['created_at'].to_s ) <= Date.today and Date.parse(row['created_at'].to_s ) >= (Date.today - 7.days)
							
							params['users_array_names'] << { username: User.find_by_id(row['user_gives_like_id']).username, id: User.find_by_id(row['user_gives_like_id']).id }
							params['user_email_report'] = user.email
							params['user_username_report'] = user.username
						else
						
						end	
					end
				end
			
			
				# We don't have any user in users_array_name we don't send the email
				if !params['users_array_names'].empty?
					#CustomMailer.follow_by_user(params).deliver
				end
			end
			
			if user.notification_followers == true then
				params = Hash.new
			
				user.followers.each do |follower|
					
					result = ActiveRecord::Base.connection.execute("SELECT created_at FROM  relationships WHERE relationships.followed_id = "+user.id.to_s+" AND relationships.follower_id = "+follower.id.to_s+";");
					
					created_at = result[0]['created_at']
					params['followers'] = Array.new
					if Date.parse(created_at) <= Date.today and Date.parse(created_at) >= (Date.today - 7.days) then
						params['followers'] << { username: follower.username, id: follower.id}
						
						params['user_email_report'] = user.email
						params['user_username_report'] = user.username
					else
					
					end
					
					print params
				end
			end
			
		  	puts "FINSHING EMAILS TO --->"+ user.email.to_s
		end
	end

end
