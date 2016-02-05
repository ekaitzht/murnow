class CustomMailer < ActionMailer::Base
  default from: "ulaize@murnow.com"

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.custom_mailer.request_product.subject
  #
  def request_product(request)
    @request = request;
    
    mail to: "ulaize@murnow.com", subject: "New product request from."
  end
  
  def request_invitation(request)
    @request = request;
    
    mail to: "ulaize@murnow.com", subject: "New invitation request."
  end
  
  def review_liked_by_user(request)
	 @request = request;
    
     mail to: @request['email_to'], subject: @request['username_gives_like'] +" likes your review"
  end
  
  

  def  likes_report(request)
	   @request = request;
    
	   mail to: @request['email_to'], subject: "You have new likes in your reviews"	  
  end
  
  
  def followers_report(request)
	@request = request;
    
    mail to: @request['email_to'], subject: "You have new followers "


  end
end
