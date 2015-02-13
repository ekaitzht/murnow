MurnowAngular::Application.configure do
    # Restrict access with HTTP Basic Auth for staging environments
    
    if  ENV['STAGING_ACTIVE']
		unless ENV['STAGING_AUTH'].blank?
	        config.middleware.use '::Rack::Auth::Basic' do |username, password|
	            ENV['STAGING_AUTH'].split(';').any? do |pair|
	                [username, password] == pair.split(':')
	            end
	        end
	    end
	end
end