class CustomMailer < ActionMailer::Base
  default from: "ekaitz@murnow.com"

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.custom_mailer.request_product.subject
  #
  def request_product(request)
    @request = request;

    mail to: "ekaitz@creative-tweed.com", subject: "New product request from"
  end
  
  
 
end
