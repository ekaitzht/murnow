class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  respond_to :html, :json

  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :set_config_email
  
  #ADING CORS TO ULAIZE REMOVE THIS
  before_filter :cors_preflight_check
  after_filter :cors_set_access_control_headers

  #def launch
  #	render 'layouts/launch',  layout: "launch"
  #end
  
  def angular
    render 'layouts/application'
  end
  
  def cors_set_access_control_headers
    headers['Access-Control-Allow-Origin'] = 'http://makeup-review-video-nazioarteko.c9.io'
    headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS'
    headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token'
    headers['Access-Control-Max-Age'] = "1728000"
  end

  def cors_preflight_check
    if request.method == 'OPTIONS'
      headers['Access-Control-Allow-Origin'] = 'http://makeup-review-video-nazioarteko.c9.io'
      headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS'
      headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-Prototype-Version, Token'
      headers['Access-Control-Max-Age'] = '1728000'
index.html
      render :text => '', :content_type => 'text/plain'
    end
  end
  

  
    private
  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << :username
    devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:username,
     :skin_type, :email,:skin_tone,:instagram_profile, :youtube_channel, :eye_color,:bio, :hash_url_image, :age) }

  end

  def set_config_email
    if Rails.env.production?
	  #ActionMailer::Base.default_url_options[:protocol] = request.protocol
      #ActionMailer::Base.default_url_options = {:host => ENV['APP_URL']}

      if ( ENV['APP_URL'] == 'www.murnow.com') then
      	ActionMailer::Base.delivery_method = :smtp
      else 
      	ActionMailer::Base.delivery_method = :test
      end

      ActionMailer::Base.smtp_settings = {
	      :address              => "smtp.gmail.com",
	      :port                 => 587,
	      :domain               => "gmail.com",
	      :user_name            => ENV['GMAIL_ULAIZE'],
	      :password             => ENV['PASSWORD_ULAIZE_GMAIL'],
	      :authentication       => :plain,
	      :enable_starttls_auto => true
      }
    end
  end

 
end

